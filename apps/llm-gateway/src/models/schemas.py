"""Pydantic schemas"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any


class ChatMessage(BaseModel):
    role: str = Field(..., pattern="^(system|user|assistant)$")
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    model: str = Field(default="gpt-4o-mini")
    temperature: float = Field(default=0.7, ge=0, le=2)
    max_tokens: Optional[int] = None
    strict_json: bool = Field(default=False)
    json_schema: Optional[Dict[str, Any]] = None


class UsageMetrics(BaseModel):
    tokens_in: int
    tokens_out: int
    estimated_cost_usd: float


class ChatResponse(BaseModel):
    id: str
    request_id: str
    content: str
    model: str
    prompt_version: str = "v1.0.0"
    usage: UsageMetrics
    latency_ms: float
    finish_reason: str = "stop"
