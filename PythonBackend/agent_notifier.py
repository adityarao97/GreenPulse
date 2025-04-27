from uagents import Agent, Context
from itertools import cycle
import requests
from content_provider import get_notification_text
from pymongo import MongoClient
from datetime import datetime

# MongoDB Setup
MONGO_URI = "mongodb+srv://adityarao:3yL9mZKRLbsibLSJ@cluster0.jguago1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["carbon_footprint_db"]
collection = db["notifications"]
# Configurable Inputs
notification_interval_minutes = 1  # Easy to modify by users

# Ask Consent for Location
user_consent = input("Allow agent to fetch your location for personalized notifications? (yes/no): ").strip().lower()

def fetch_auto_location():
    try:
        response = requests.get('https://ipinfo.io/json')
        data = response.json()
        city = data.get('city', 'Los Angeles')
        return city
    except:
        return "Los Angeles"

if user_consent == "yes":
    user_location = fetch_auto_location()
    print(f"Auto-fetched location: {user_location}")
else:
    user_location = "Los Angeles"
    print("Using default location: Los Angeles")

# Categories to Rotate
user_categories = cycle(["transport", "food", "energy", "shopping"])

# Create the Fetch.ai Agent
notifier_agent = Agent(name="notification sender", seed="greenpulse_secret", port=8007, endpoint=["http://127.0.0.1:8007"])

# Scheduled Notification with Custom Interval
@notifier_agent.on_interval(period=notification_interval_minutes * 60)  # Minutes to seconds
async def send_notification(ctx: Context):
    category = next(user_categories)
    notification = get_notification_text(category, user_location)
    timestamp = datetime.utcnow()
    collection.insert_one({
        "location": user_location,
        "category": category,
        "notification": notification,
        "timestamp": timestamp
    })
    ctx.logger.info(f"[AUTO-NOTIFICATION] | Location: {user_location} | Category: {category} | {notification}")

# Run the Agent
if __name__ == "__main__":
    notifier_agent.run()
