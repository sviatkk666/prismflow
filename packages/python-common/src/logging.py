"""Structured logging utilities"""

import logging
import sys
from pythonjsonlogger import jsonlogger
from typing import Optional


def setup_logging(service_name: str, level: str = "INFO") -> None:
    """Setup structured JSON logging"""
    log_handler = logging.StreamHandler(sys.stdout)
    formatter = jsonlogger.JsonFormatter(
        "%(timestamp)s %(level)s %(name)s %(message)s"
    )
    log_handler.setFormatter(formatter)
    
    logger = logging.getLogger(service_name)
    logger.addHandler(log_handler)
    logger.setLevel(getattr(logging, level))
    logger.propagate = False


def log_request(
    logger: logging.Logger,
    request_id: str,
    service: str,
    endpoint: str,
    method: str = "POST",
    **kwargs
) -> None:
    """Log request with structured data"""
    logger.info(
        "Request received",
        extra={
            "request_id": request_id,
            "service": service,
            "endpoint": endpoint,
            "method": method,
            **kwargs,
        },
    )


def log_response(
    logger: logging.Logger,
    request_id: str,
    latency_ms: float,
    status_code: int = 200,
    **kwargs
) -> None:
    """Log response with structured data"""
    logger.info(
        "Response sent",
        extra={
            "request_id": request_id,
            "latency_ms": latency_ms,
            "status_code": status_code,
            **kwargs,
        },
    )
