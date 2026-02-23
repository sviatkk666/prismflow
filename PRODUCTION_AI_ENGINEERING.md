# Strong Junior AI Engineer Plan (Clear Version)

Goal: start earning fast with one real project (3-4h/day, 10 weeks).

Status:
- `⬜` not started
- `🟨` in progress
- `✅` done

Rule:
- Work only on current week.
- Do not move to next week until "Done when" is true.
- Start applying in Week 6.

---

## Step 0 - Real-world project context (fixed)

Project: **E-commerce Support Copilot API** (single project for all 10 weeks).

Business scenario:
- Customer support team handles repetitive questions: shipping, refunds, returns, product compatibility.
- Team needs fast, consistent, source-grounded answers from docs and policy pages.
- Tech lead wants API quality, reliability, and measurable cost/latency.

Users:
- Support agents (primary)
- Team lead/QA (secondary)
- HR/Tech interviewer (reviewer of your engineering quality)

Input data:
- Help center articles
- Return/refund policies
- Product FAQ and troubleshooting docs
- Optional: anonymized support tickets

Output format:
- Answer for support agent
- 1-3 citations (doc title + url/id)
- Confidence flag (`high`/`low`)
- Usage and latency metadata

Project requirements:
- API: `POST /v1/chat`, `POST /v1/chat/stream`
- RAG with citations
- Retry, rate limit, cache
- Basic CI + tests + small eval set

Feature map (what each week adds to product):
- Week 1: **Feature A - Core Answer API**
- Week 2: **Feature B - Streaming + Traceability**
- Week 3: **Feature C - Knowledge Ingestion**
- Week 4: **Feature D - Source-grounded Quality**
- Week 5: **Feature E - Reliability Controls**
- Week 6: **Feature F - Performance and Cost Layer**
- Week 7: **Feature G - CI Quality Gate**
- Week 8: **Feature H - Portfolio Packaging**
- Week 9: **Feature I - Job Funnel**
- Week 10: **Feature J - Offer Conversion**

---

## AI usage policy (every week)

Use AI for:
- boilerplate code
- test skeletons
- doc templates
- refactor suggestions

Do yourself (mandatory):
- architecture decisions
- final API contracts
- bug debugging and fixes
- writing final tests assertions
- README and explanation of trade-offs

Quality gate:
- If you cannot explain a function, rewrite it until you can.

---

## Week-by-week with details

### Week 1 - Feature A: Core Answer API

Build:
- ⬜ Implement `POST /v1/chat`
- ⬜ Request schema: `message`, `user_id`, `session_id`, `strict_json`, `json_schema`
- ⬜ Response schema: `answer`, `citations`, `usage`, `request_id`, `errors`
- ⬜ Add strict JSON validation and error handling
- ⬜ Add 10 API tests (happy path + validation errors)

Feature context:
- This is the base endpoint support agents call from CRM/helpdesk UI.
- For now, return LLM answer even without RAG; citations can be empty in Week 1.

Requirements:
- Return typed error body for invalid input
- No unhandled exceptions in logs
- Use HTTP status codes correctly (`200`, `400/422`, `500`)

Done when:
- All tests pass
- 10/10 test prompts return valid schema

AI usage this week:
- AI can generate Pydantic models and route skeleton
- You must write final schema and test assertions yourself

### Week 2 - Feature B: Streaming + Traceability

Build:
- ⬜ Implement `POST /v1/chat/stream` (SSE)
- ⬜ Add structured JSON logs
- ⬜ Add `request_id` middleware and include it in all responses
- ⬜ Add latency logging (`duration_ms`)
- ⬜ Add 5 tests for stream/non-stream parity

Feature context:
- Support UI should show answer tokens as they arrive.
- Team lead should be able to debug any failed request by `request_id`.

Requirements:
- Each log line has `timestamp`, `level`, `service`, `request_id`
- Stream mode returns same final answer semantics as non-stream

Done when:
- You can trace one request end-to-end in logs
- Stream and non-stream tests pass

AI usage this week:
- AI can draft middleware and logger setup
- You must verify log format and parity behavior manually

### Week 3 - Feature C: Knowledge Ingestion

Build:
- ⬜ Implement chunking (`chunk_size`, `overlap`)
- ⬜ Save metadata (`doc_id`, `source`, `chunk_id`)
- ⬜ Ingest at least 30 documents
- ⬜ Implement retrieval endpoint/service (`top_k`)
- ⬜ Add 10 ingestion/retrieval tests

Feature context:
- Add support docs and policy docs into vector DB.
- This unlocks grounded answers instead of pure model memory.

Requirements:
- Ingestion idempotent (re-running does not duplicate chunks)
- Retrieval response includes source metadata

Done when:
- 30+ docs are indexed
- Retrieval works for at least 20 sample questions

AI usage this week:
- AI can draft ingestion scripts
- You must choose chunking values and justify them in docs

### Week 4 - Feature D: Source-grounded Quality

Build:
- ⬜ Force citations in final answer format
- ⬜ Add simple retrieval metric (Hit@k or Recall@k)
- ⬜ Create 20 labeled Q/A checks for your domain
- ⬜ Add report script (`eval_rag.py`)

Feature context:
- Agents must trust the response and quickly verify policy links.
- "No source" should be treated as lower-confidence answer.

Requirements:
- Answer without source is marked as low confidence
- Report includes metric score and failed cases

Done when:
- All answers include sources
- One metric report file is generated

AI usage this week:
- AI can generate eval script template
- You must label dataset and review failed cases

### Week 5 - Feature E: Reliability Controls

Build:
- ⬜ Add timeout and retries with exponential backoff
- ⬜ Add rate limiting (per IP or user)
- ⬜ Add basic quota (daily request cap)
- ⬜ Add failure tests (provider timeout, 429 bursts)

Feature context:
- Prevent outages and abuse during busy support hours.
- API should degrade gracefully, not crash under load spikes.

Requirements:
- Retries only on transient errors
- Controlled `429` returned on abuse

Done when:
- Timeout/retry tests pass
- Burst test returns proper `429` responses

AI usage this week:
- AI can suggest retry library and config
- You must decide retry policy and max attempts

### Week 6 - Feature F: Performance and Cost Layer

Build:
- ⬜ Add response caching (exact-match key + TTL)
- ⬜ Log cache hit/miss counters
- ⬜ Compute `p95 latency` and `cost/request`
- ⬜ Add metrics section to README

Feature context:
- Repeated support questions should be cheap and fast.
- This is the first business KPI week (speed + cost).

Requirements:
- Cache invalidation on prompt/template change
- Cost tracking visible per request

Done when:
- Repeated queries are measurably faster
- README shows baseline vs improved metrics

AI usage this week:
- AI can draft cache wrapper
- You must define cache key strategy and validate metrics

### Week 7 - Feature G: CI Quality Gate

Build:
- ⬜ Create eval set (30-50 realistic prompts)
- ⬜ Add CI pipeline: lint + tests + eval script
- ⬜ Fail pipeline when tests/eval fail
- ⬜ Save one successful CI run screenshot

Feature context:
- Prevent broken support quality from being deployed.
- Interviewers expect this as "engineering maturity" proof.

Requirements:
- Pull request with failing test must be blocked
- Eval output saved as artifact/log

Done when:
- CI blocks bad change
- One clean green pipeline run exists

AI usage this week:
- AI can create workflow YAML
- You must tune fail thresholds and verify locally

### Week 8 - Feature H: Portfolio Packaging

Build:
- ⬜ Write clean README: problem, architecture, setup, metrics
- ⬜ Add simple architecture diagram (PNG or Mermaid)
- ⬜ Record 3-5 minute demo video
- ⬜ Clean repo (`.env.example`, no secrets, clear commands)

Feature context:
- HR and Tech Lead should understand project value in 3 minutes.
- This week converts technical work into hiring signal.

Requirements:
- New user can run in <20 minutes
- README contains measurable outcomes

Done when:
- Friend/peer can run project using README only

AI usage this week:
- AI can polish text
- You must record demo and explain decisions yourself

### Week 9 - Feature I: Job Funnel

Build:
- ⬜ Update CV with metric-based bullets
- ⬜ Send 15-25 applications
- ⬜ Send 10 direct outreach messages
- ⬜ Track all responses in one sheet

Feature context:
- Treat job search as a pipeline with weekly conversion metrics.

Requirements:
- CV bullets include results (latency, quality, reliability)
- Target roles: Junior ML / Applied AI / Python AI

Done when:
- At least 3 screening calls are booked

AI usage this week:
- AI can tailor CV and message templates
- You must customize each application to company stack

### Week 10 - Feature J: Offer Conversion

Build:
- ⬜ Run 5 mock interviews
- ⬜ Practice 10-minute project walkthrough daily
- ⬜ Send 20 freelance pitches (small AI automation gigs)
- ⬜ Prepare paid trial proposal template

Feature context:
- Convert interviews/outreach into first paid engagement.

Requirements:
- You can explain architecture, trade-offs, failures, and fixes
- You can quote clear scope and price for small projects

Done when:
- At least 1 paid trial/freelance conversation is active

AI usage this week:
- AI can simulate interview questions
- You must answer without reading notes

---

## Weekly time template (3-4h/day)

- Mon: build feature A
- Tue: build feature B
- Wed: tests
- Thu: bug fixes + refactor
- Fri: docs + metrics
- Sat: interview prep + applications
- Sun: rest or catch-up

---

## Fast earning focus

Start monetizing from Week 6:
- apply for junior roles
- offer small paid builds:
  - "RAG chatbot for docs"
  - "Support answer assistant"
  - "Internal policy Q&A bot"

Simple pricing for first gigs:
- MVP setup: fixed small package
- then monthly support/maintenance add-on
