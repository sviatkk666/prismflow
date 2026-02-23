# 🟡 Mid-Level Applied AI Engineer — Certification Evaluation

**Status:** ⬜ In Progress | ✅ Complete | ❌ Not Started

**Date Started:** _______________

**Date Completed:** _______________

---

## 📋 How To Use

Mark only when:
- ✅ You **implemented** it
- ✅ You **understand tradeoffs**
- ✅ You can **explain it without guessing**

**Every concept must be applied in code.**

---

## 1️⃣ LLM Foundations (Applied)

### Core Understanding

| Item | Status | Implementation File | Notes |
|------|--------|---------------------|-------|
| Explain what a Transformer does (high-level) | ⬜ | | |
| Explain tokens and tokenization | ⬜ | | |
| Explain context window limits | ⬜ | | |
| Explain temperature vs top_p tradeoffs | ⬜ | | |
| Explain why hallucinations happen | ⬜ | | |

**Validation:** Can you explain each concept clearly without AI help?
- [ ] Yes, I can explain all 5 concepts
- [ ] Need to review: _______________

---

### API & Output Control

| Item | Status | Implementation File | Test File | Notes |
|------|--------|---------------------|-----------|-------|
| Implement basic chat completion endpoint | ⬜ | | | |
| Implement structured JSON output | ⬜ | | | |
| Validate output using schema (Zod/Pydantic) | ⬜ | | | |
| Handle malformed JSON safely | ⬜ | | | |
| Implement streaming response (SSE/WebSocket) | ⬜ | | | |
| Add AbortController / cancellation support | ⬜ | | | |
| Implement retry with exponential backoff | ⬜ | | | |
| Handle API timeouts gracefully | ⬜ | | | |

**Validation:** Test each implementation with edge cases.
- [ ] All implementations tested
- [ ] Edge cases handled: _______________

---

### Cost Awareness

| Item | Status | Implementation File | Notes |
|------|--------|---------------------|-------|
| Log input tokens per request | ⬜ | | |
| Log output tokens per request | ⬜ | | |
| Calculate cost per request | ⬜ | | |
| Compare 2 models by cost vs quality | ⬜ | | |
| Implement simple response caching | ⬜ | | |
| Add max token budget per request | ⬜ | | |

**Validation:** Can you estimate cost for 1000 requests?
- [ ] Yes, I can calculate: _______________
- [ ] Need to implement cost tracking

---

## 2️⃣ RAG System (Core Skill)

### Embeddings

| Item | Status | Implementation File | Test File | Notes |
|------|--------|---------------------|-----------|-------|
| Generate embeddings | ⬜ | | | |
| Store embeddings with metadata | ⬜ | | | |
| Explain cosine similarity | ⬜ | | |
| Explain vector dimensionality impact | ⬜ | | |
| Compare similarity thresholds experimentally | ⬜ | | |

**Validation:** 
- [ ] Can explain why cosine similarity > Euclidean for text
- [ ] Understands dimensionality tradeoffs
- [ ] Has tested similarity thresholds

---

### Chunking

| Item | Status | Implementation File | Test File | Notes |
|------|--------|---------------------|-----------|-------|
| Implement fixed-size chunking | ⬜ | | | |
| Implement chunk overlap | ⬜ | | | |
| Compare 2 chunk sizes experimentally | ⬜ | | | |
| Explain recall vs precision tradeoff | ⬜ | | |
| Explain why large chunks reduce precision | ⬜ | | |

**Validation:**
- [ ] Can explain recall vs precision tradeoff
- [ ] Understands why overlap improves recall
- [ ] Has experimental results comparing chunk sizes

**Experimental Results:**
```
Chunk Size A: _____ | Recall: _____ | Precision: _____
Chunk Size B: _____ | Recall: _____ | Precision: _____
```

---

### Retrieval

| Item | Status | Implementation File | Test File | Notes |
|------|--------|---------------------|-----------|-------|
| Implement vector similarity search | ⬜ | | | |
| Add metadata filtering | ⬜ | | | |
| Tune top_k experimentally | ⬜ | | | |
| Build retrieval → generation pipeline | ⬜ | | | |
| Force model to answer only from context | ⬜ | | | |
| Add "no answer found" fallback | ⬜ | | | |
| Return source citations | ⬜ | | | |

**Validation:**
- [ ] Retrieval pipeline works end-to-end
- [ ] Can detect when retrieval fails
- [ ] Citations are accurate

**Top-K Tuning Results:**
```
top_k=3: Precision: _____ | Recall: _____
top_k=5: Precision: _____ | Recall: _____
top_k=10: Precision: _____ | Recall: _____
```

---

## 3️⃣ Basic Agent Capabilities

| Item | Status | Implementation File | Test File | Notes |
|------|--------|---------------------|-----------|-------|
| Implement tool calling | ⬜ | | | |
| Define tool schema strictly | ⬜ | | | |
| Validate tool arguments | ⬜ | | | |
| Execute tools safely | ⬜ | | | |
| Prevent infinite tool loops (max step guard) | ⬜ | | | |
| Log tool execution steps | ⬜ | | | |

**Validation:**
- [ ] Tool calling works reliably
- [ ] Infinite loops prevented
- [ ] All tool executions logged

**Max Step Guard:** Set to: _____ steps

---

## 4️⃣ Production Basics

| Item | Status | Implementation File | Monitoring | Notes |
|------|--------|---------------------|------------|-------|
| Handle rate limits properly | ⬜ | | | |
| Handle timeouts | ⬜ | | | |
| Log requests and structured errors | ⬜ | | | |
| Track latency (p50/p95) | ⬜ | | | |
| Track token usage per user | ⬜ | | | |
| Basic prompt versioning system | ⬜ | | | |

**Validation:**
- [ ] Rate limits handled gracefully
- [ ] Timeouts don't crash system
- [ ] Logging is structured and searchable
- [ ] Latency metrics tracked
- [ ] Token usage per user tracked

**Current Metrics:**
```
p50 Latency: _____ ms
p95 Latency: _____ ms
Average tokens/user/day: _____
```

---

## 5️⃣ Mini Evaluation Layer (Mid-Level Requirement)

| Item | Status | Dataset File | Results File | Notes |
|------|--------|--------------|--------------|-------|
| Create small RAG test dataset (20–50 Q&A) | ⬜ | | | |
| Test retrieval accuracy manually | ⬜ | | | |
| Detect when model answers outside context | ⬜ | | | |
| Compare two prompt versions | ⬜ | | | |

**Test Dataset:**
- Total Questions: _____
- Questions with answers in context: _____
- Questions without answers: _____

**Retrieval Accuracy:**
```
Correct retrievals: _____ / _____ (_____%)
False positives: _____
False negatives: _____
```

**Prompt Comparison:**
```
Version A: Accuracy: _____ | Avg tokens: _____
Version B: Accuracy: _____ | Avg tokens: _____
Winner: _____
```

---

## 🧠 Mid-Level Validation Questions

**Answer these WITHOUT AI help. Write your answers below:**

### LLM Questions

1. **Why does higher temperature increase hallucination?**
   - Your Answer: 
   - [ ] ✅ Confident | ⬜ Need to review

2. **What happens if structured JSON is malformed?**
   - Your Answer: 
   - [ ] ✅ Confident | ⬜ Need to review

3. **When should you use streaming?**
   - Your Answer: 
   - [ ] ✅ Confident | ⬜ Need to review

4. **When should you NOT use streaming?**
   - Your Answer: 
   - [ ] ✅ Confident | ⬜ Need to review

5. **Why do system prompts matter?**
   - Your Answer: 
   - [ ] ✅ Confident | ⬜ Need to review

### RAG Questions

6. **Why does chunk overlap improve recall?**
   - Your Answer: 
   - [ ] ✅ Confident | ⬜ Need to review

7. **Why does large chunk size reduce precision?**
   - Your Answer: 
   - [ ] ✅ Confident | ⬜ Need to review

8. **Why cosine similarity instead of Euclidean?**
   - Your Answer: 
   - [ ] ✅ Confident | ⬜ Need to review

9. **What happens if top_k is too large?**
   - Your Answer: 
   - [ ] ✅ Confident | ⬜ Need to review

10. **How do you detect retrieval failure?**
    - Your Answer: 
    - [ ] ✅ Confident | ⬜ Need to review

### Production Questions

11. **What breaks first at 1k users?**
    - Your Answer: 
    - [ ] ✅ Confident | ⬜ Need to review

12. **Why must you log tokens?**
    - Your Answer: 
    - [ ] ✅ Confident | ⬜ Need to review

13. **How do you prevent cost explosion?**
    - Your Answer: 
    - [ ] ✅ Confident | ⬜ Need to review

14. **What happens if API times out?**
    - Your Answer: 
    - [ ] ✅ Confident | ⬜ Need to review

15. **When is RAG better than fine-tuning?**
    - Your Answer: 
    - [ ] ✅ Confident | ⬜ Need to review

**Score:** _____ / 15 questions answered confidently

---

## 🎯 Passing Criteria Checklist

- [ ] **Implemented everything above** (all items marked ✅)
- [ ] **Can answer at least 12/15 questions clearly** (Score: _____ / 15)
- [ ] **Can explain architecture end-to-end** (Documentation: _______________)
- [ ] **Can estimate cost roughly before launch** (Example estimate: _______________)

**Architecture Explanation:**
```
[Write a brief explanation of your end-to-end architecture here]
```

**Cost Estimation Example:**
```
Scenario: 1000 users, 10 requests/user/day
Model: _______________
Estimated tokens/day: _______________
Estimated cost/day: _______________
Estimated cost/month: _______________
```

---

## 📝 Implementation Notes

### Key Files Created:
- 
- 
- 

### Key Learnings:
- 
- 
- 

### Challenges Overcome:
- 
- 
- 

### Next Steps:
- 
- 
- 

---

## ✅ Final Certification Status

**Overall Status:** ⬜ In Progress | ✅ Complete | ❌ Not Started

**Completion Date:** _______________

**Reviewer Notes:** _______________

---

## 📚 Reference Links

- [ ] LLM API Documentation: _______________
- [ ] Vector Store Documentation: _______________
- [ ] Evaluation Dataset: _______________
- [ ] Architecture Diagram: _______________

---

**Last Updated:** _______________
