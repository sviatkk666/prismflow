"""Chat routes"""

import time
import httpx
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from ..models.schemas import ChatRequest, ChatResponse
from ..config import OPENAI_API_KEY, OPENAI_BASE_URL
from python_common.observability import get_request_id, track_latency
from python_common.cost_tracking import estimate_cost
from python_common.security import sanitize_input, detect_injection
import json

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Chat completion endpoint"""
    request_id = get_request_id()
    start_time = time.time()
    
    # Sanitize input
    for msg in request.messages:
        msg.content = sanitize_input(msg.content)
        if detect_injection(msg.content):
            raise HTTPException(status_code=400, detail="Potential prompt injection detected")
    
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")
    
    # Prepare OpenAI request
    openai_messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
    openai_payload = {
        "model": request.model,
        "messages": openai_messages,
        "temperature": request.temperature,
    }
    
    if request.max_tokens:
        openai_payload["max_tokens"] = request.max_tokens
    
    if request.strict_json:
        openai_payload["response_format"] = {"type": "json_object"}
        if request.json_schema:
            openai_payload["response_format"]["schema"] = request.json_schema
    
    # Call OpenAI API
    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            response = await client.post(
                f"{OPENAI_BASE_URL}/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENAI_API_KEY}",
                    "Content-Type": "application/json",
                },
                json=openai_payload,
            )
            response.raise_for_status()
            data = response.json()
        except httpx.HTTPStatusError as e:
            raise HTTPException(status_code=e.response.status_code, detail=str(e))
    
    # Extract response
    choice = data["choices"][0]
    content = choice["message"]["content"]
    usage_data = data["usage"]
    
    latency_ms = (time.time() - start_time) * 1000
    cost = estimate_cost(request.model, usage_data["prompt_tokens"], usage_data["completion_tokens"])
    
    return ChatResponse(
        id=data["id"],
        request_id=request_id,
        content=content,
        model=request.model,
        prompt_version="v1.0.0",
        usage={
            "tokens_in": usage_data["prompt_tokens"],
            "tokens_out": usage_data["completion_tokens"],
            "estimated_cost_usd": cost,
        },
        latency_ms=latency_ms,
        finish_reason=choice["finish_reason"],
    )


@router.post("/chat/stream")
async def chat_stream(request: ChatRequest):
    """Streaming chat completion endpoint"""
    request_id = get_request_id()
    
    # Sanitize input
    for msg in request.messages:
        msg.content = sanitize_input(msg.content)
        if detect_injection(msg.content):
            raise HTTPException(status_code=400, detail="Potential prompt injection detected")
    
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail="OpenAI API key not configured")
    
    # Prepare OpenAI request
    openai_messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
    openai_payload = {
        "model": request.model,
        "messages": openai_messages,
        "temperature": request.temperature,
        "stream": True,
    }
    
    async def generate():
        async with httpx.AsyncClient(timeout=60.0) as client:
            async with client.stream(
                "POST",
                f"{OPENAI_BASE_URL}/chat/completions",
                headers={
                    "Authorization": f"Bearer {OPENAI_API_KEY}",
                    "Content-Type": "application/json",
                },
                json=openai_payload,
            ) as response:
                response.raise_for_status()
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        data_str = line[6:]
                        if data_str == "[DONE]":
                            yield f"event: done\ndata: {json.dumps({'request_id': request_id})}\n\n"
                            break
                        try:
                            data = json.loads(data_str)
                            if "choices" in data and len(data["choices"]) > 0:
                                delta = data["choices"][0].get("delta", {}).get("content", "")
                                if delta:
                                    yield f"event: chunk\ndata: {json.dumps({'delta': delta, 'request_id': request_id})}\n\n"
                        except json.JSONDecodeError:
                            continue
    
    return StreamingResponse(generate(), media_type="text/event-stream")
