# calculator.py
from parse_defra import load_emission_factors
from llm_query import query_mapping  

# Load factors dynamically from DEFRA data
EMISSION_FACTORS = load_emission_factors("defra.xlsx")

# Add any static or hardcoded ones not yet covered in DEFRA
EMISSION_FACTORS.update({
    "car_km": 0.192,
    "bus_km": 0.089,
    "bike_km": 0.0,
    "walk_km": 0.0,
    "electricity_kwh": 0.417,
    "natural_gas_kwh": 0.185,
    "beef_meal": 5.4,
    "mcd_takeout": 1.2,
})

def fix_activity_type(activity_type):
    try:
        # Try using the LLM to intelligently map the keyword
        mapped_type = query_mapping(activity_type, list(EMISSION_FACTORS.keys()))
        return mapped_type
    except Exception:
        # Fallback: just return the raw activity
        return activity_type


def calculate_emission(activity_type, amount):
    factor = EMISSION_FACTORS.get(activity_type)
    if factor is None:
        raise ValueError(f"Unknown activity type: {activity_type}")
    return round(amount * factor, 3)

def calculate_daily_score(emission):
    if emission == 0:
        return 100
    elif emission < 2:
        return 80
    elif emission < 5:
        return 60
    else:
        return 40
