"""Common Pydantic models"""

from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class RequestContext(BaseModel):
    """Request context with ID and metadata"""
    request_id: str
    service: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)


class UsageMetrics(BaseModel):
    """Token usage and cost metrics"""
    tokens_in: int = 0
    tokens_out: int = 0
    estimated_cost_usd: float = 0.0


class ErrorResponse(BaseModel):
    """Standard error response"""
    error: str
    request_id: Optional[str] = None
    details: Optional[dict] = None
