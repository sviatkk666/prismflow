.PHONY: help install dev up down test lint format clean

help:
	@echo "PrismFlow - AI Engineer Platform"
	@echo "Commands:"
	@echo "  make install    - Install all dependencies"
	@echo "  make dev        - Start all services in dev mode"
	@echo "  make up         - Start all services (demo mode)"
	@echo "  make down       - Stop all services"
	@echo "  make test       - Run all tests"
	@echo "  make lint       - Lint all code"
	@echo "  make format     - Format all code"
	@echo "  make ingest     - Ingest sample documents"
	@echo "  make eval       - Run evaluation harness"
	@echo "  make clean      - Clean build artifacts"

install:
	@echo "Installing portal dependencies..."
	cd apps/portal && npm install
	@echo "Installing Python packages..."
	cd packages/python-common && pip install -e .
	cd packages/vector-store && pip install -e .
	cd apps/llm-gateway && pip install -e .
	cd apps/rag-service && pip install -e .
	cd apps/agent-service && pip install -e .
	cd apps/eval-harness && pip install -e .

dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

up:
	docker-compose up -d

down:
	docker-compose down

test:
	@echo "Running Python tests..."
	pytest apps/*/tests packages/*/tests || true
	@echo "Running portal tests..."
	cd apps/portal && npm test || true

lint:
	@echo "Linting Python code..."
	ruff check apps packages || true
	@echo "Linting portal code..."
	cd apps/portal && npm run lint || true

format:
	@echo "Formatting Python code..."
	ruff format apps packages || true
	@echo "Formatting portal code..."
	cd apps/portal && npm run format || true

ingest:
	@echo "Ingesting sample documents..."
	python -m ingestion_worker ingest --path examples/sample-documents --collection default || echo "Ingestion worker not yet implemented"

eval:
	@echo "Running evaluation harness..."
	python -m eval_harness run --dataset examples/eval-datasets/sample.jsonl --module llm --output eval-results/ || echo "Eval harness not yet implemented"

clean:
	@echo "Cleaning build artifacts..."
	find . -type d -name __pycache__ -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .pytest_cache -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name .next -exec rm -rf {} + 2>/dev/null || true
	find . -type d -name node_modules -exec rm -rf {} + 2>/dev/null || true
	cd apps/portal && rm -rf .next node_modules 2>/dev/null || true
