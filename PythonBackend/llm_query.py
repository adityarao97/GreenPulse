import os
import json
from datetime import datetime
from llama_index.llms.asi import ASI

import json
import time
import uuid

os.environ["ASI_API_KEY"] = "sk_c4b6b2dbaf754942afab16af41f5cd499e7a5b2b21f24e4aaaadc64d0bd326a2"
llm = ASI(model="asi1-mini")

def query_mapping(user_keyword, available_activities):
    prompt = f"""
You are an expert carbon emissions assistant.

Given the following list of available activity types:
{', '.join(available_activities)}

Match the user keyword "{user_keyword}" to the most appropriate activity type from the list. 
Only return the exact activity type string, nothing else.
If nothing matches exactly, pick the most logical one.

Example:
User keyword: "office commute" → Matched activity: "car_km"
User keyword: "burger" → Matched activity: "beef_meal"
"""
    response = llm.complete(prompt)
    return response.text.strip() if hasattr(response, "text") else str(response).strip()


def query_emission(question):
    prompt = f"""
    You are a carbon emissions assistant. Respond strictly with carbon footprint estimates or climate-related impact.
    Do NOT include dietary, health, or lifestyle guidance.

    User asked: "{question}"
    """
    try:
        response = llm.complete(prompt)
        text = response.text.strip() if hasattr(response, "text") else str(response).strip()
        if not text or "{" not in text:
            return "Sorry, I couldn't estimate the emission for that. Please try rephrasing or specify the quantity."
        return text
    except Exception as e:
        return f"LLM Error: {str(e)}"

def classify_query_type(message: str) -> str:
    prompt = f"""
    You are a carbon emissions assistant. Classify the following message into one of three categories:
    1. log_activity
    2. specific_emission_query
    3. general_emission_advice
    Message: \"{message}\"
    Only respond with one of the options above. Never give explanations. Only reply with one of these category names exactly no numbers.

    """
    result = llm.complete(prompt)
    query_type = result.text.strip().lower()
    print("QUERY TYPE:", query_type)
    return query_type

# If you have a real ObjectId generator, you can import it instead.
def generate_oid():
    """Simulate a MongoDB-style ObjectId."""
    return uuid.uuid4().hex[:24]

import json

def extract_activity_data(message: str, user_id="user1", company_id="eco-inc", source="smartphone", sender_address="agent1qdpperskmqx4y0q32skxenqn5z6v06l85eksnn99xpymdrsf30sywqrqw4d") -> dict:
    prompt = f"""
    Extract a structured JSON object from this user message: \"{message}\".
    Return only these fields:
    - activity_type: one of [transportation, energy, food, shopping, other]
    - metadata: a sub-category based on activity_type:
        - transportation -> public, private, walking
        - energy -> homeElectricity, solar
        - food -> vegan, vegetarian, meat
        - shopping -> electronics, clothing, plastic, glass
        - other -> misc, unknown, uncategorized
    - amount: numeric float (example: 5.0, 12.5)
    - unit: one of [km, kwh, meals, steps, hours]

    Important:
    - Only return **valid JSON**, no explanations or extra text.
    - If missing or unsure, set metadata to "null".
    - Always quote the keys and values properly.

    Example output format:
    {{
        "activity_type": "transportation",
        "metadata": "private",
        "amount": 12.5,
        "unit": "km"
    }}
    """

    try:
        response = llm.complete(prompt)
        text = response.text.strip()

        if not text:
            raise ValueError("Empty response from LLM.")

        # Remove triple backticks if present
        if text.startswith("```json"):
            text = text.replace("```json", "").strip()
        if text.endswith("```"):
            text = text[:-3].strip()

        print("[DEBUG] Raw LLM Output:", text)

        text = text.replace("'", '"')

        extracted = json.loads(text)

        # Build the full expected format
        activity_data = {
            "activity_type": extracted.get("activity_type", ""),
            "metadata": extracted.get("metadata", "null"),
            "amount": float(extracted.get("amount", 0.0)),
            "unit": extracted.get("unit", ""),
        }

        return activity_data

    except Exception as e:
        raise ValueError(f"Failed to extract activity data: {e}")

    
def identify_emission_key(message: str, valid_keys: list) -> str:
    prompt = f"""
    You are a carbon emissions assistant. The user is asking about a specific activity related to carbon emissions.

    Match their message to the most appropriate key from this list:
    {', '.join(valid_keys)}

    Only return the single best matching key from this list, with no explanations or extra text.

    Message: "{message}"
    """
    try:
        result = llm.complete(prompt)
        return result.text.strip()
    except Exception as e:
        print(f"LLM mapping error: {e}")
        return ""
    
def generate_general_advice(activities_summary: str, total_emission: float) -> str:
    """
    Ask LLM to generate general eco-friendly advice based on user's recent activities and carbon footprint.
    The advice should be personalized, friendly, and broader than just reducing emissions.
    """
    prompt = f"""
    You are a friendly sustainability and climate coach.

    Here is the user's recent carbon-related activity:

    {activities_summary}

    Their total recorded emissions are {total_emission} kg CO₂e.

    Based on their activities, suggest 3 short personalized eco-friendly tips or advice.
    Your tips can include:
    - Reducing emissions
    - Sustainable lifestyle choices
    - Eco-friendly habits
    - Smarter transportation, energy, shopping or food options

    Each tip should be 1–2 lines long, positive, and easy to understand.
    Do NOT repeat their activity data back to them. Just focus on giving helpful, encouraging advice.
    """

    try:
        response = llm.complete(prompt)
        return response.text.strip() if hasattr(response, "text") else str(response).strip()
    except Exception as e:
        return f"LLM Error while generating general advice: {str(e)}"

def generate_emission_message(activity_type: str, amount: float, unit: str, emission: float) -> str:
    prompt = f"""
You are a friendly carbon footprint assistant.

Based on this information:
- Activity: {activity_type}
- Amount: {amount}
- Unit: {unit}
- Emission: {emission} kg CO₂e

Write a short natural language sentence summarizing what the user did and how much carbon they emitted.
Make it friendly and easy to understand.

Examples:
- "Driving 20 km by car resulted in about 3.8 kg of CO₂e emissions."
- "Eating 2 beef meals generated around 10.8 kg of CO₂e."
- "Using 50 kWh of electricity added 20.9 kg CO₂e to your footprint."

Do NOT mention activity_type keywords like 'transportation' or 'shopping' — describe it naturally.

Write only the final sentence, no explanations.
"""

    try:
        response = llm.complete(prompt)
        return response.text.strip() if hasattr(response, "text") else str(response).strip()
    except Exception as e:
        return f"LLM Error while generating emission message: {str(e)}"