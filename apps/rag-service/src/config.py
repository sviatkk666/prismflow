"""Configuration"""

import os

PORT: int = int(os.getenv("PORT", "8002"))
LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
CHROMA_HOST: str = os.getenv("CHROMA_HOST", "localhost")
CHROMA_PORT: int = int(os.getenv("CHROMA_PORT", "8000"))
VECTOR_STORE_TYPE: str = os.getenv("VECTOR_STORE_TYPE", "chroma")
OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
