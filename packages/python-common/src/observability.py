"""Observability utilities"""

import time
import uuid
from functools import wraps
from typing import Callable, Any


def get_request_id() -> str:
    """Generate a unique request ID"""
    return str(uuid.uuid4())


def track_latency(func: Callable) -> Callable:
    """Decorator to track function latency"""
    @wraps(func)
    async def async_wrapper(*args, **kwargs):
        start = time.time()
        try:
            result = await func(*args, **kwargs)
            latency_ms = (time.time() - start) * 1000
            return result, latency_ms
        except Exception as e:
            latency_ms = (time.time() - start) * 1000
            raise e
    
    @wraps(func)
    def sync_wrapper(*args, **kwargs):
        start = time.time()
        try:
            result = func(*args, **kwargs)
            latency_ms = (time.time() - start) * 1000
            return result, latency_ms
        except Exception as e:
            latency_ms = (time.time() - start) * 1000
            raise e
    
    import asyncio
    if asyncio.iscoroutinefunction(func):
        return async_wrapper
    return sync_wrapper


def log_structured(logger, level: str, message: str, **data) -> None:
    """Log structured data"""
    getattr(logger, level.lower())(message, extra=data)
