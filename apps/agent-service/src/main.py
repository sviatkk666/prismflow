"""Agent Service main application"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .config import PORT, LOG_LEVEL
from python_common.logging import setup_logging

setup_logging("agent-service", LOG_LEVEL)

app = FastAPI(
    title="PrismFlow Agent Service",
    description="Agent execution service",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
async def health():
    return {"status": "healthy", "service": "agent-service"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
