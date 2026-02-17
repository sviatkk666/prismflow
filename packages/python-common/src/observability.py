"""Observability utilities"""

import time
import uuid
from functools import wraps
from typing import Callable, Any


def get_request_id() -> str:
    """
    Generate a unique request ID using UUID.
    
    WHAT IT DOES:
    - Creates a unique identifier for each request
    - Uses UUID4 (random UUID) which is virtually guaranteed to be unique
    - Returns as string (e.g., "550e8400-e29b-41d4-a716-446655440000")
    
    WHY YOU NEED IT:
    - Trace a request through multiple services/logs
    - Debug issues by searching logs for a specific request_id
    - Correlate request and response logs
    - Track request flow in distributed systems
    
    Returns:
        Unique request ID string
    
    Example:
        >>> request_id = get_request_id()
        >>> print(request_id)
        "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
    """
    return str(uuid.uuid4())


def track_latency(func: Callable) -> Callable:
    """
    Decorator to automatically measure function execution time (latency).
    
    HOW IT WORKS:
    - Wraps a function to measure how long it takes to execute
    - Records start time before function runs
    - Records end time after function completes
    - Calculates latency in milliseconds
    - Returns both the function result AND the latency
    
    SUPPORTS BOTH SYNC AND ASYNC:
    - Automatically detects if function is async (using asyncio.iscoroutinefunction)
    - Returns appropriate wrapper (async_wrapper for async, sync_wrapper for sync)
    
    USAGE:
        @track_latency
        def my_function():
            # ... do work ...
            return result
        
        result, latency_ms = my_function()  # Returns (result, latency_ms)
    
    Args:
        func: Function to wrap (can be sync or async)
    
    Returns:
        Wrapped function that returns (result, latency_ms) tuple
    
    Example:
        >>> @track_latency
        >>> def slow_function():
        ...     time.sleep(0.1)
        ...     return "done"
        >>> result, latency = slow_function()
        >>> print(f"Took {latency}ms")  # "Took 100.5ms"
    """
    @wraps(func)
    async def async_wrapper(*args, **kwargs):
        # Record start time before executing the async function
        start = time.time()
        try:
            # Execute the async function and wait for result
            result = await func(*args, **kwargs)
            # Calculate latency: (end_time - start_time) * 1000 to convert to milliseconds
            latency_ms = (time.time() - start) * 1000
            # Return both the result and the latency
            return result, latency_ms
        except Exception as e:
            # Even if function fails, still calculate latency (useful for debugging slow failures)
            latency_ms = (time.time() - start) * 1000
            # Re-raise the exception (don't swallow errors)
            raise e
    
    @wraps(func)
    def sync_wrapper(*args, **kwargs):
        # Record start time before executing the sync function
        start = time.time()
        try:
            # Execute the sync function
            result = func(*args, **kwargs)
            # Calculate latency in milliseconds
            latency_ms = (time.time() - start) * 1000
            # Return both the result and the latency
            return result, latency_ms
        except Exception as e:
            # Even if function fails, still calculate latency
            latency_ms = (time.time() - start) * 1000
            # Re-raise the exception
            raise e
    
    # Check if the function is async (coroutine function)
    import asyncio
    if asyncio.iscoroutinefunction(func):
        # Return async wrapper for async functions
        return async_wrapper
    # Return sync wrapper for regular functions
    return sync_wrapper


def log_structured(logger, level: str, message: str, **data) -> None:
    """
    Helper function to log structured data with a specific log level.
    
    WHAT IT DOES:
    - Provides a convenient way to log with structured data (key-value pairs)
    - Dynamically calls the appropriate log level method (info, error, warning, etc.)
    - All data passed via **data becomes structured fields in the JSON log
    
    WHY USE IT:
    - Cleaner than writing logger.info(message, extra={...}) every time
    - Consistent way to add structured data to logs
    - Makes logs searchable/filterable by any field
    
    Args:
        logger: Logger instance (from logging.getLogger())
        level: Log level string - "INFO", "ERROR", "WARNING", "DEBUG", etc.
        message: Log message string
        **data: Key-value pairs to include as structured fields in the log
    
    Example:
        >>> logger = logging.getLogger("my-service")
        >>> log_structured(logger, "INFO", "User logged in", user_id="123", ip="1.2.3.4")
        # Equivalent to: logger.info("User logged in", extra={"user_id": "123", "ip": "1.2.3.4"})
    """
    # Dynamically get the log method (logger.info, logger.error, etc.) based on level string
    # level.lower() converts "INFO" -> "info", "ERROR" -> "error", etc.
    # Then call that method with the message and extra structured data
    getattr(logger, level.lower())(message, extra=data)
