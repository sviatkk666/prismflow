# Codebase notes — self-check later

Use this file to write down what you learned about the codebase. Come back later and test yourself: do you still remember and get it?

---

## Security
 (`packages/python-common/src/security.py`)

### Sanitize
- What does `sanitize_input` do?
- Which characters does it remove? Which does it keep (e.g. newline, tab)?
- What else does it do to the string (whitespace, strip)?

### Prompt injection detection
- What does `detect_injection` do?
- Why is it "only one line of defense"?
- What kind of patterns does it match (examples)?

### Output validation
- What does `validate_output` do?
- When would you use it (e.g. LLM output, API contract)?
- What does `repair_json` fix?

---

## Libraries we talked about

### Sanitization / escaping
- **bleach** — 
- **markupsafe** — 
- **html5lib** — 

### Prompt injection / LLM safety
- **guardrails-ai** — 

### General
- For SQL: use parameterization (ORM/driver), not string sanitization.

---

## Chroma & vector databases
(`packages/vector-store/`)

### What is a vector database?
- Stores **embeddings** (vectors): numerical representations of text (or images, etc.).
- Search is **by similarity**, not by exact match or SQL: “find chunks most similar to this query.”
- Used for **semantic search**, **RAG** (retrieval-augmented generation), recommendations, dedup.

### What is an embedding?
- A list of numbers (vector) that represents meaning of text.
- Similar meaning → similar vectors → small “distance” (e.g. cosine, L2).
- Produced by an **embedding model** (OpenAI, sentence-transformers, etc.); the vector DB just stores and searches them.

### Chroma (what we use)
- **Chroma**: open-source vector DB. Easy to run locally or as a server.
- In this repo: `ChromaVectorStore` in `chroma_client.py` implements `VectorStore` (ingest, query, delete_collection).
- Connects via **HTTP client** to a Chroma server (`chromadb.HttpClient(host, port)`).
- **Collections** = logical groups of vectors (like a table). Each item has: id, document (text), metadata, and the vector (Chroma can compute embeddings if you don’t provide them).
- **ingest**: add a document + metadata to a collection; get back `chunk_id`.
- **query**: send query text; get `top_k` most similar documents + scores (we use `1.0 - distance` as score).
- **delete_collection**: remove a collection.

### Other vector databases (to know)
- **Pinecone** — managed, cloud; good for production scale.
- **Weaviate** — open-source; supports hybrid (keyword + vector) search.
- **Qdrant** — open-source; good performance, filtering.
- **pgvector** — PostgreSQL extension; vectors inside Postgres (no extra service).
- **Milvus** / **Zilliz** — for very large scale.
- **FAISS** — library, not a server; in-memory / file-based similarity search.

### When to use which?
- **Chroma**: prototyping, small/medium apps, simple ops, local or single-server.
- **Pinecone / managed**: production, no-ops, high scale.
- **pgvector**: you already use Postgres and want one less service.
- **Weaviate / Qdrant**: need advanced filtering or hybrid search.


### Self-check
- What is Chroma? What is it used for in this codebase?
- What’s the difference between “vector search” and “keyword search”?
- What does `ingest` do? What does `query` return?
- What is a “collection” in Chroma?
- Name 2–3 other vector DBs and when you’d consider them.

---

## Your own notes (add below)

sanitize_input - очищаєм від зайвих пробілів, і противних символів для відображення, роботи
detect_injection - перевірка на маминого хацкера
validate_output - взнаєм чи та жєйсонка нам ніхуя не поламає