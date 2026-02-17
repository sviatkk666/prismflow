# Codebase notes — self-check later

Use this file to write down what you learned about the codebase. Come back later and test yourself: do you still remember and get it?

---

## Security (`packages/python-common/src/security.py`)

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

## Your own notes (add below)

sanitize_input - очищаєм від зайвих пробілів, і противних символів для відображення, роботи
detect_injection - перевірка на маминого хацкера
validate_output - взнаєм чи та жєйсонка нам ніхуя не поламає