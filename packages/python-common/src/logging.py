"""Structured logging utilities"""

import logging
import sys
from pythonjsonlogger import jsonlogger
from typing import Optional


def setup_logging(service_name: str, level: str = "INFO") -> None:
    """
    Setup structured JSON logging for a service.
    
    HOW IT WORKS:
    - Uses Python's built-in `logging` module (no additional libraries needed for basic logging)
    - Uses `pythonjsonlogger` library to format logs as JSON (makes them easy to parse/search)
    - Logs go to stdout (standard output) - this is standard practice for containers/microservices
    - JSON format allows log aggregation tools (like ELK, Datadog, CloudWatch) to parse and search logs easily
    
    The logger created here can be used throughout your service to log structured data.
    
    Args:
        service_name: Name of your service (e.g., "llm-gateway", "agent-service")
                     This appears in the "name" field of each log entry
        level: Log level string - "DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"
               Only logs at or above this level will be output
    
    Example:
        >>> setup_logging("my-service", "INFO")
        >>> logger = logging.getLogger("my-service")
        >>> logger.info("Hello")  # Outputs JSON: {"timestamp": "...", "level": "INFO", "name": "my-service", "message": "Hello"}
    """
    # Create a handler that writes logs to stdout (standard output)
    # This is standard for containers - log aggregation tools read from stdout
    log_handler = logging.StreamHandler(sys.stdout)
    
    # Create a JSON formatter - converts log entries into JSON format
    # Format string defines which fields to include: timestamp, level, name (service), message
    formatter = jsonlogger.JsonFormatter(
        "%(timestamp)s %(level)s %(name)s %(message)s"
    )
    log_handler.setFormatter(formatter)
    
    # Get or create a logger with the service name
    # All logs from this logger will include the service name
    logger = logging.getLogger(service_name)
    
    # Attach the handler to the logger (so logs actually get written)
    logger.addHandler(log_handler)
    
    # Set the minimum log level (e.g., INFO means DEBUG logs are ignored)
    logger.setLevel(getattr(logging, level))
    
    # Prevent logs from propagating to parent loggers (avoids duplicate logs)
    logger.propagate = False


def log_request(
    logger: logging.Logger,
    request_id: str,
    service: str,
    endpoint: str,
    method: str = "POST",
    **kwargs
) -> None:
    """
    Log an incoming HTTP request with structured data.
    
    This function creates a structured log entry for a request, including:
    - request_id: Unique ID to track this request through the system
    - service: Which service received the request
    - endpoint: API endpoint path (e.g., "/chat", "/health")
    - method: HTTP method (GET, POST, etc.)
    - Any additional fields passed via **kwargs
    
    Structured logging means all data is in JSON format, making it easy to:
    - Search logs by request_id to trace a request through the system
    - Filter logs by endpoint, method, service, etc.
    - Aggregate metrics (e.g., count requests per endpoint)
    
    Args:
        logger: Logger instance (from logging.getLogger())
        request_id: Unique identifier for this request
        service: Service name that received the request
        endpoint: API endpoint path
        method: HTTP method (default: "POST")
        **kwargs: Additional fields to include in the log (e.g., user_id, ip_address)
    
    Example:
        >>> logger = logging.getLogger("my-service")
        >>> log_request(logger, "req-123", "llm-gateway", "/chat", "POST", user_id="user-456")
        # Outputs JSON log with all these fields
    """
    logger.info(
        "Request received",
        extra={
            "request_id": request_id,
            "service": service,
            "endpoint": endpoint,
            "method": method,
            **kwargs,  # Merge any additional fields into the log entry
        },
    )


def log_response(
    logger: logging.Logger,
    request_id: str,
    latency_ms: float,
    status_code: int = 200,
    **kwargs
) -> None:
    """
    Log an outgoing HTTP response with structured data.
    
    This function creates a structured log entry for a response, including:
    - request_id: Same ID as the request log (allows tracing)
    - latency_ms: How long the request took to process (in milliseconds)
    - status_code: HTTP status code (200, 404, 500, etc.)
    - Any additional fields passed via **kwargs
    
    By logging both request and response with the same request_id, you can:
    - Trace a request from start to finish
    - Calculate response times
    - Monitor error rates (filter by status_code >= 400)
    - Debug issues by searching for a specific request_id
    
    Args:
        logger: Logger instance (from logging.getLogger())
        request_id: Same unique identifier as the request log
        latency_ms: Request processing time in milliseconds
        status_code: HTTP status code (default: 200)
        **kwargs: Additional fields to include (e.g., tokens_used, cost, error_message)
    
    Example:
        >>> logger = logging.getLogger("my-service")
        >>> log_response(logger, "req-123", 45.2, 200, tokens_used=1500)
        # Outputs JSON log with latency, status, and tokens_used
    """
    logger.info(
        "Response sent",
        extra={
            "request_id": request_id,
            "latency_ms": latency_ms,
            "status_code": status_code,
            **kwargs,  # Merge any additional fields into the log entry
        },
    )
