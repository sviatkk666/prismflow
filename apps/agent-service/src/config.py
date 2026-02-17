"""Configuration"""

import os

PORT: int = int(os.getenv("PORT", "8003"))
LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
LLM_GATEWAY_URL: str = os.getenv("LLM_GATEWAY_URL", "http://localhost:8001")
RAG_SERVICE_URL: str = os.getenv("RAG_SERVICE_URL", "http://localhost:8002")
OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
