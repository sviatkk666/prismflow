# PrismFlow

> Where AI meets beautiful interfaces

PrismFlow is a comprehensive monorepo showcasing production-ready AI engineering patterns through a stunning, animation-rich React portal. Experience LLM orchestration, RAG pipelines, agent frameworks, and evaluation harnesses with beautiful data visualizations, smooth transitions, and interactive demos that bridge impressive UX to clean, documented code.

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ (for local portal development)
- Python 3.12+ (for local backend development)
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd prismflow
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Edit `.env` and add your OpenAI API key:
```bash
OPENAI_API_KEY=your_key_here
```

4. Install dependencies:
```bash
make install
```

5. Start all services:
```bash
make dev
```

6. Access the portal at `http://localhost:3000`

### Local development (no Docker)

Run the portal and LLM gateway in **two separate terminals**:

**Terminal 1 – Portal**
```bash
cd apps/portal
npm install
npm run dev
```
Then open **http://localhost:3000** (or **http://127.0.0.1:3000**).

**Terminal 2 – LLM Gateway**
```bash
cd apps/llm-gateway
pip install -e .
python -m uvicorn src.main:app --reload --port 8001
```
API: **http://localhost:8001** · Docs: **http://localhost:8001/docs**

If **localhost is not reachable**, try **127.0.0.1** instead (e.g. http://127.0.0.1:3000). Ensure no other app is using ports 3000 or 8001, and that your firewall allows local connections.

## 📖 Architecture

PrismFlow is organized as a monorepo with the following structure:

- **apps/**: Application services
  - `portal/`: Next.js React portal
  - `llm-gateway/`: LLM API gateway service
  - `rag-service/`: RAG service
  - `agent-service/`: Agent execution service
  - `eval-harness/`: Evaluation framework
  - `ingestion-worker/`: Document ingestion CLI

- **packages/**: Shared packages
  - `python-common/`: Python utilities (logging, cost tracking, security)
  - `vector-store/`: Vector store abstraction (Chroma/pgvector)
  - `shared-types/`: TypeScript types shared between portal and services

## 🎯 Modules

### LLM Gateway
Unified LLM API gateway with streaming, cost tracking, and strict JSON mode support.

**Endpoints:**
- `POST /chat` - Chat completion
- `POST /chat/stream` - Streaming chat completion

### RAG Service
Retrieval-Augmented Generation service with Chroma vector store.

**Endpoints:**
- `POST /rag/ingest` - Ingest documents
- `POST /rag/query` - Query with RAG

### Agent Service
Agent execution service with tool calling and step tracking.

**Endpoints:**
- `POST /agent/run` - Run agent task

### Evaluation Harness
Comprehensive evaluation framework.

**Endpoints:**
- `POST /eval/run` - Run evaluation
- `GET /eval/report` - Get evaluation report

## 🛠️ Development

### Running Services Individually

**Portal:**
```bash
cd apps/portal
npm run dev
```

**Backend Services:**
```bash
cd apps/llm-gateway
python -m uvicorn src.main:app --reload --port 8001
```

### Testing

```bash
make test
```

### Linting & Formatting

```bash
make lint
make format
```

## 📊 Observability

All services log structured JSON with:
- Request ID tracking
- Latency measurements
- Cost tracking
- Token usage
- Error tracking

## 🔒 Security

- Input sanitization
- Prompt injection detection
- Output validation
- Rate limiting (configurable)

## 📚 Documentation

- [Component Library](./apps/portal/components/README.md)
- [API Reference](./docs/api-reference.md) (coming soon)
- [Architecture](./docs/architecture.md) (coming soon)

## 📄 License

MIT
