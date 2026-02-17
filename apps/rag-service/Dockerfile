FROM python:3.12-slim

WORKDIR /app

COPY pyproject.toml ./
COPY src ./src
COPY ../../packages/python-common ../../packages/python-common
COPY ../../packages/vector-store ../../packages/vector-store

RUN pip install --no-cache-dir -e . && \
    pip install --no-cache-dir -e ../../packages/python-common && \
    pip install --no-cache-dir -e ../../packages/vector-store

EXPOSE 8002

CMD ["python", "-m", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8002"]
