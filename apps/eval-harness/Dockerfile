FROM python:3.12-slim

WORKDIR /app

COPY pyproject.toml ./
COPY src ./src
COPY ../../packages/python-common ../../packages/python-common

RUN pip install --no-cache-dir -e . && \
    pip install --no-cache-dir -e ../../packages/python-common

EXPOSE 8004

CMD ["python", "-m", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8004"]
