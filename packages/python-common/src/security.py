"""Security utilities for input sanitization and validation"""

import re
import json
from typing import Optional, Tuple


def sanitize_input(text: str) -> str:
    """Sanitize user input by removing control characters and normalizing whitespace."""
    text = re.sub(r'[\x00-\x08\x0b-\x0c\x0e-\x1f]', '', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()


def detect_injection(text: str) -> bool:
    """Detect common prompt injection patterns. Returns True if suspicious pattern found."""
    patterns = [
        r'ignore\s+(previous|all|above)\s+instructions?',
        r'forget\s+(previous|all|above)',
        r'you\s+are\s+now',
        r'act\s+as\s+if',
        r'pretend\s+to\s+be',
        r'reset\s+(the\s+)?conversation',
        r'disregard\s+(all|previous|above)\s+instructions?',
        r'((replace|override|bypass|jailbreak).{0,15}instructions?)',
        r'assume\s+the\s+role\s+of',
        r'remove\s+all\s+filters',
        r'(###|\{prompt\}|\[INSTRUCTION\])',
        r'from\s+now\s+on[, ]*\s*you\s+(must|shall)',
        r'ignore\s+your\s+previous\s+(rules|guidelines|directives)',
        r'these\s+are\s+your\s+new\s+instructions',
        r'new\s+set\s+of\s+rules\s+for\s+you',
        r'forget\s+everything\s+you\s+have\s+been\s+told',
        r'ignore\s+the\s+(system|safety)\s+instructions?',
        r'you\s+must\s+not\s+follow\s+any\s+previous\s+instructions',
        r'\b(do[-\s]?anything[-\s]?now|dan)\b',
    ]
    text_lower = text.lower()
    for pattern in patterns:
        if re.search(pattern, text_lower):
            return True
    return False


def validate_output(text: str, schema: Optional[dict] = None) -> Tuple[bool, str]:
    """Validate output as JSON; optionally check against schema. Returns (valid, text)."""
    if schema is None:
        try:
            json.loads(text)
            return True, text
        except json.JSONDecodeError:
            repaired = repair_json(text)
            try:
                json.loads(repaired)
                return True, repaired
            except json.JSONDecodeError:
                return False, text
    else:
        try:
            data = json.loads(text)
        except json.JSONDecodeError:
            repaired = repair_json(text)
            try:
                data = json.loads(repaired)
                text = repaired  # Use repaired text on success
            except json.JSONDecodeError:
                return False, text

        # If we reach here, data is parsed JSON and schema is provided.
        # Very basic schema validation without external libraries.
        # Schema is assumed to be a dict with keys and types, e.g., {"foo": str, "bar": int}
        if not isinstance(data, dict):
            return False, text

        for k, v in schema.items():
            if k not in data:
                return False, text
            # v may be a type or a tuple of types
            if not isinstance(data[k], v):
                return False, text
        return True, text
    """Validate output as JSON; optionally check schema. Returns (valid, text)."""
    if schema is None:
        return True, text
    try:
        json.loads(text)
        return True, text
    except json.JSONDecodeError:
        repaired = repair_json(text)
        try:
            json.loads(repaired)
            return True, repaired
        except json.JSONDecodeError:
            return False, text


def repair_json(text: str) -> str:
    """Attempt to repair common JSON issues (e.g. trailing commas)."""
    text = re.sub(r',\s*}', '}', text)
    text = re.sub(r',\s*]', ']', text)
    return text
