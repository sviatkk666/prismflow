# PrismFlow - Quick Start Guide

## ✅ What's Been Implemented

### Frontend (Portal)
- ✅ Next.js 14 App Router setup
- ✅ Complete animation component library (Framer Motion)
- ✅ Chart components (Recharts)
- ✅ UI components (Button, Card, Input, CodeViewer, etc.)
- ✅ Landing page with module cards
- ✅ LLM Gateway page (basic structure)
- ✅ Placeholder pages for other modules

### Backend Services
- ✅ LLM Gateway service (FastAPI) - `/chat` and `/chat/stream` endpoints
- ✅ RAG Service (FastAPI) - Basic structure
- ✅ Agent Service (FastAPI) - Basic structure
- ✅ Eval Harness (FastAPI) - Basic structure

### Python Packages

#### `python-common` - Shared Utilities
A foundational package providing common utilities used across all backend services.

**Modules:**
- **`logging.py`** - Structured JSON logging
  - `setup_logging()` - Configure JSON-formatted logging for services
  - `log_request()` - Log incoming requests with structured data
  - `log_response()` - Log responses with latency and status codes
  
- **`cost_tracking.py`** - LLM cost estimation
  - `MODEL_PRICING` - Pricing data for GPT-4, Claude, and other models
  - `estimate_cost()` - Calculate USD cost from token usage
  - `get_model_config()` - Get pricing config for specific models
  
- **`security.py`** - Input sanitization and validation
  - `sanitize_input()` - Remove control characters and normalize whitespace
  - `detect_injection()` - Detect common prompt injection patterns
  - `validate_output()` - Validate JSON output against schemas
  - `repair_json()` - Attempt to fix common JSON formatting issues
  
- **`observability.py`** - Request tracking and metrics
  - `get_request_id()` - Generate unique request IDs
  - `track_latency()` - Decorator to measure function execution time
  - `log_structured()` - Helper for structured logging
  
- **`models.py`** - Common Pydantic models
  - `RequestContext` - Request ID and service metadata
  - `UsageMetrics` - Token usage and cost tracking
  - `ErrorResponse` - Standardized error response format

**Dependencies:**
- `pydantic>=2.0.0`
- `python-json-logger>=2.0.0`

**Usage Example:**
```python
from python_common.logging import setup_logging, log_request, log_response
from python_common.cost_tracking import estimate_cost
from python_common.observability import get_request_id, track_latency
from python_common.models import RequestContext, UsageMetrics

# Setup logging
logger = setup_logging("my-service", level="INFO")

# Track requests
request_id = get_request_id()
log_request(logger, request_id, "my-service", "/endpoint")

# Estimate costs
cost = estimate_cost("gpt-4o", tokens_in=1000, tokens_out=500)
```

#### `vector-store` - Vector Database Abstraction
A vector store interface with ChromaDB implementation for RAG functionality.

**Modules:**
- **`interface.py`** - Abstract base class
  - `VectorStore` - ABC defining `ingest()`, `query()`, and `delete_collection()` methods
  
- **`chroma_client.py`** - ChromaDB implementation
  - `ChromaVectorStore` - Concrete implementation using ChromaDB HTTP client
  - Supports document ingestion with metadata
  - Semantic search with similarity scoring
  - Collection management

**Dependencies:**
- `chromadb>=0.4.0`
- `pydantic>=2.0.0`
- Optional: `pgvector` support via `psycopg2-binary` and `pgvector` (for PostgreSQL)

**Usage Example:**
```python
from vector_store import ChromaVectorStore

# Initialize client
store = ChromaVectorStore(host="localhost", port=8000)

# Ingest documents
chunk_id = store.ingest(
    text="Your document text here",
    metadata={"source": "file.pdf", "page": 1},
    collection_name="documents"
)

# Query similar documents
results = store.query(
    text="What is this about?",
    top_k=5,
    collection_name="documents"
)
# Returns: [{"chunk_id": "...", "text": "...", "metadata": {...}, "score": 0.95}, ...]
```

**Package Installation:**
```bash
# Install python-common
cd packages/python-common
pip install -e .

# Install vector-store
cd ../vector-store
pip install -e .

# Or install both at once
pip install -e packages/python-common -e packages/vector-store
```

**Service Dependencies:**
- **LLM Gateway**: Uses `python-common` for logging, cost tracking, and observability
- **RAG Service**: Uses both `python-common` and `vector-store`
- **Agent Service**: Uses `python-common` for logging and observability
- **Eval Harness**: Uses `python-common` for metrics and logging

### Infrastructure
- ✅ Docker Compose setup
- ✅ Makefile with common commands
- ✅ Environment configuration
- ✅ Git ignore

## 🚀 Starting the Project

### Option 1: Docker Compose (Recommended)

1. **Set up environment:**
```bash
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

2. **Start all services:**
```bash
make dev
```

This will start:
- ChromaDB on port 8000
- LLM Gateway on port 8001
- RAG Service on port 8002
- Agent Service on port 8003
- Eval Harness on port 8004
- Portal on port 3000

### Option 2: Local Development

**Portal:**
```bash
cd apps/portal
npm run dev
```

**Backend Services:**
```bash
# Install Python packages first
cd packages/python-common
pip install -e .

cd ../../apps/llm-gateway
pip install -e .
python -m uvicorn src.main:app --reload --port 8001
```

## 📝 Next Steps for AI Functionality

You can now focus on implementing:

1. **RAG Service** (`apps/rag-service/src/routes/`):
   - Implement `/rag/ingest` endpoint
   - Implement `/rag/query` endpoint
   - Integrate with vector-store package

2. **Agent Service** (`apps/agent-service/src/`):
   - Implement agent executor
   - Add tool calling logic
   - Create step tracking

3. **Eval Harness** (`apps/eval-harness/src/`):
   - Implement evaluation runner
   - Add report generation
   - Create trend analysis

4. **Portal Modules** (`apps/portal/components/modules/`):
   - Complete MetricsDisplay
   - Implement CitationList
   - Create AgentTimeline
   - Build EvalReportTable
   - Add StreamingChat

## 🎨 Using Animation Components

All animation components are ready to use:

```tsx
import { FadeIn, SlideUp, StaggerChildren } from '@/components/animations';
import { Button, Card } from '@/components/ui';
import { CostChart, ScoreBar } from '@/components/charts';

// Use in your AI modules!
```

See `apps/portal/components/README.md` for full documentation.

## 🔧 Troubleshooting

**Port conflicts:**
- Make sure ports 3000, 8000-8004 are available
- Or modify ports in docker-compose.yml

**Python package installation:**
- Make sure you're using Python 3.12+
- Use `pip install -e .` in each package directory

**Next.js build errors:**
- Run `npm install` in `apps/portal`
- Check that all dependencies are installed

## 📚 Documentation

- Component Library: `apps/portal/components/README.md`
- Blueprint: `BLUEPRINT.md`
- Main README: `README.md`
- **Production AI Engineering**: `PRODUCTION_AI_ENGINEERING.md` — checklist to cover all production work cases for a strong AI Applied Engineer (security, observability, reliability, testing, infra, etc.)