"""LLM Gateway main application"""

import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.chat import router as chat_router
from .config import PORT, LOG_LEVEL

try:
    from python_common.logging import setup_logging
    setup_logging("llm-gateway", LOG_LEVEL)
except ModuleNotFoundError:
    logging.basicConfig(level=getattr(logging, LOG_LEVEL.upper(), logging.INFO))

app = FastAPI(
    title="PrismFlow LLM Gateway",
    description="Unified LLM API gateway with streaming, cost tracking, and strict JSON mode",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router, prefix="/v1/chat", tags=["chat"])


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy", "service": "llm-gateway"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
