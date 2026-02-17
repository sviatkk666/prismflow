"""Cost tracking utilities"""

# Model pricing per 1M tokens (input/output)
MODEL_PRICING = {
    "gpt-4o-mini": {"input": 0.15, "output": 0.60},
    "gpt-4o": {"input": 2.50, "output": 10.00},
    "gpt-4-turbo": {"input": 10.00, "output": 30.00},
    "gpt-3.5-turbo": {"input": 0.50, "output": 1.50},
    "claude-3-opus": {"input": 15.00, "output": 75.00},
    "claude-3-sonnet": {"input": 3.00, "output": 15.00},
    "claude-3-haiku": {"input": 0.25, "output": 1.25},
}


def get_model_config(model: str) -> dict:
    """Get pricing config for a model"""
    return MODEL_PRICING.get(model, MODEL_PRICING["gpt-4o-mini"])


def estimate_cost(model: str, tokens_in: int, tokens_out: int) -> float:
    """Estimate cost in USD for token usage"""
    config = get_model_config(model)
    input_cost = (tokens_in / 1_000_000) * config["input"]
    output_cost = (tokens_out / 1_000_000) * config["output"]
    return input_cost + output_cost
