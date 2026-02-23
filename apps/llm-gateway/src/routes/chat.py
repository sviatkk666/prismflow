"""Chat routes — pseudo-code and tips. Implement the logic yourself."""

# -----------------------------------------------------------------------------
# IMPORTS (tips: which lib/module to use — uncomment as you implement)
# -----------------------------------------------------------------------------
from fastapi import APIRouter
# from fastapi import HTTPException  # HTTP errors + status
# from fastapi.responses import StreamingResponse  # SSE for /stream
# from pydantic import BaseModel, Field  # request/response schemas (or use ..models.schemas)
# import httpx  # async HTTP client to call OpenAI API
# import time  # measure latency
# import json  # parse OpenAI stream chunks, build SSE payloads
# from ..config import OPENAI_API_KEY, OPENAI_BASE_URL
try:
    from python_common.observability import get_request_id
except ModuleNotFoundError:
    import uuid
    def get_request_id() -> str:
        return str(uuid.uuid4())
# from python_common.cost_tracking import estimate_cost  # token → USD
# from python_common.security import sanitize_input, detect_injection  # safety

router = APIRouter()


# -----------------------------------------------------------------------------
# POST /  →  full path: POST /v1/chat  (Week 1: Core Answer API)
# -----------------------------------------------------------------------------
# Request body: message, user_id, session_id, strict_json, json_schema
# Response body: answer, citations, usage, request_id, errors (optional)
# Status: 200 OK, 400/422 validation, 500 server error
# -----------------------------------------------------------------------------

@router.post("/")  # response_model=YourResponseSchema
async def chat(request):  # TODO: type with Pydantic model (message, user_id, session_id, strict_json, json_schema)
    """Chat completion: one user message → one LLM answer. Citations empty in Week 1."""

    request_id = get_request_id()  # pyright: ignore[reportUnusedVariable]
    # 2. Validate/sanitize input so invalid or malicious input doesn’t reach the LLM.
    #    Tip: python_common.security.sanitize_input, detect_injection
    #    On failure: return 400 with typed error body (Pydantic model), not raw exception.

    # 3. Check config (e.g. OPENAI_API_KEY). If missing → 500, typed error body.
    #    Tip: ..config

    # 4. Build OpenAI-style payload: messages (e.g. [{"role":"user","content": message}]),
    #    model, temperature; if strict_json → response_format json_object / schema.
    #    Tip: httpx for async POST to OPENAI_BASE_URL/chat/completions

    # 5. Call OpenAI, measure latency (time before/after).
    #    Tip: time.time(); httpx.AsyncClient(timeout=...).post(...)
    #    On HTTP or network error → 500, typed error body; no unhandled exceptions in logs.

    # 6. Map OpenAI response to your response schema: answer (content), citations ([] for Week 1),
    #    usage (tokens_in, tokens_out, estimated_cost_usd), request_id.
    #    Tip: python_common.cost_tracking.estimate_cost(model, prompt_tokens, completion_tokens)

    # 7. Return 200 with response model (answer, citations, usage, request_id, errors if any).
    pass


# -----------------------------------------------------------------------------
# POST /stream  →  full path: POST /v1/chat/stream  (Week 2: streaming)
# -----------------------------------------------------------------------------
# Same request as above. Response: SSE stream (event: chunk / event: done).
# -----------------------------------------------------------------------------

@router.post("/stream")
async def chat_stream(request):  # TODO: same request model as chat
    """Streaming chat: same input, response is Server-Sent Events."""

    # 1. Request_id, sanitize, config check — same as non-stream.

    # 2. Build OpenAI payload with stream=True.

    # 3. Use httpx client.stream("POST", ...) and iterate response.aiter_lines().
    #    Parse "data: {...}" lines; on "[DONE]" send event: done and break.
    #    Tip: json.loads(line[6:]) for "data: ". Yield "event: chunk\ndata: ...\n\n".

    # 4. Return StreamingResponse(generator(), media_type="text/event-stream").
    #    Tip: fastapi.responses.StreamingResponse
    pass
