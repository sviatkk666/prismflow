"""Configuration"""

import os
from typing import Optional

PORT: int = int(os.getenv("PORT", "8001"))
LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
OPENAI_API_KEY: Optional[str] = os.getenv("OPENAI_API_KEY")
OPENAI_BASE_URL: str = os.getenv("OPENAI_BASE_URL", "https://api.openai.com/v1")
RATE_LIMIT_PER_MINUTE: int = int(os.getenv("RATE_LIMIT_PER_MINUTE", "100"))
