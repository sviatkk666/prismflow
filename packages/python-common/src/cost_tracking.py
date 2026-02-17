"""Cost tracking utilities"""

# Model pricing per 1M tokens (input/output)
# Prices are in USD per million tokens
# Example: gpt-4o-mini costs $0.15 per 1M input tokens, $0.60 per 1M output tokens
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
    """
    Get pricing config for a model.
    
    This function looks up the pricing configuration for a given model name.
    If the model is not found in MODEL_PRICING, it defaults to gpt-4o-mini pricing.
    
    Args:
        model: Model name string (e.g., "gpt-4o", "claude-3-sonnet")
    
    Returns:
        Dictionary with "input" and "output" keys containing price per 1M tokens
    
    Example:
        >>> get_model_config("gpt-4o")
        {"input": 2.50, "output": 10.00}
        >>> get_model_config("unknown-model")
        {"input": 0.15, "output": 0.60}  # defaults to gpt-4o-mini
    """
    return MODEL_PRICING.get(model, MODEL_PRICING["gpt-4o-mini"])


def estimate_cost(model: str, tokens_in: int, tokens_out: int) -> float:
    """
    Estimate cost in USD for token usage.
    
    This is the core cost calculation: multiply token counts by price per million tokens.
    Formula: (tokens / 1,000,000) * price_per_million = cost
    
    In production, this basic calculation is correct, but you might also want:
    - Price updates mechanism (not hardcoded - prices change over time)
    - Historical cost tracking (store costs in database)
    - Currency conversion (if supporting multiple currencies)
    - Caching (if looking up prices from external API)
    - More models (as new ones are released)
    - Tiered pricing (if providers offer volume discounts)
    
    Args:
        model: Model name string
        tokens_in: Number of input tokens used
        tokens_out: Number of output tokens generated
    
    Returns:
        Total cost in USD (float)
    
    Example:
        >>> estimate_cost("gpt-4o-mini", 1000, 500)
        0.00045  # $0.00015 (input) + $0.00030 (output) = $0.00045
    """
    # Get pricing config for this model (or default)
    config = get_model_config(model)
    
    # Calculate input cost: convert tokens to millions, multiply by price per million
    # Example: 1,000,000 tokens * $0.15 / 1M = $0.15
    input_cost = (tokens_in / 1_000_000) * config["input"]
    
    # Calculate output cost: same formula for output tokens
    # Example: 500,000 tokens * $0.60 / 1M = $0.30
    output_cost = (tokens_out / 1_000_000) * config["output"]
    
    # Total cost is sum of input and output costs
    return input_cost + output_cost
