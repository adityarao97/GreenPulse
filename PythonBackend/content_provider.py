# content_provider.py

import requests
from datetime import datetime
import google.generativeai as genai

# Configure Gemini API
genai.configure(api_key="AIzaSyAsLD7BaH7Ev6ehM1ZvuDHQ2hgdvMHuyfU")

def get_weather(location):
    api_key = "715b8f094a057a57e4f29db24ec45018"
    base_url = "http://api.openweathermap.org/data/2.5/weather"
    params = {"q": location, "appid": api_key, "units": "metric"}
    response = requests.get(base_url, params=params)
    data = response.json()
    if response.status_code == 200:
        weather_main = data["weather"][0]["main"].lower()
        temp = data["main"]["temp"]
        return weather_main, temp
    else:
        return "moderate", 20

def build_prompt(category, location, current_time, weather_main, temp):
    hour = current_time.hour
    if hour < 10:
        time_of_day = "morning"
    elif hour < 18:
        time_of_day = "afternoon"
    else:
        time_of_day = "evening"

    prompt = f"""
    Provide a short, friendly eco-friendly suggestion (max 2 sentences) based on these details:
    - Category: {category}
    - Location: {location}
    - Weather: {weather_main}, Temperature: {temp}°C
    - Time of Day: {time_of_day}

    Make sure the advice is specific to the category and helps the user reduce their carbon footprint today.
    """
    return prompt

def get_notification_text(category, location):
    current_time = datetime.now()
    weather_main, temp = get_weather(location)
    prompt = build_prompt(category, location, current_time, weather_main, temp)
    model = genai.GenerativeModel(model_name="models/gemini-1.5-pro-latest")
    response = model.generate_content(prompt)
    return response.text.strip()
