"""Configuration"""

import os

PORT: int = int(os.getenv("PORT", "8004"))
LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
LLM_GATEWAY_URL: str = os.getenv("LLM_GATEWAY_URL", "http://localhost:8001")
RAG_SERVICE_URL: str = os.getenv("RAG_SERVICE_URL", "http://localhost:8002")
AGENT_SERVICE_URL: str = os.getenv("AGENT_SERVICE_URL", "http://localhost:8003")
