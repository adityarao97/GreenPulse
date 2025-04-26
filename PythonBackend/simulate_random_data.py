import requests
import random
import time
from datetime import datetime, timedelta

# API endpoint
API_URL = "http://127.0.0.1:8001/send-activity"

# Companies and their respective unique users
company_users = {
    "company1": [f"user{i}" for i in range(1, 6)],       # user1 to user5
    "company2": [f"user{i}" for i in range(6, 11)],      # user6 to user10
    "company3": [f"user{i}" for i in range(11, 16)]      # user11 to user15
}

sources = ["smartphone", "smartwatch", "manual", "IOT"]

activity_types = {
    "transportation": {
        "metadata": ["public", "private", "walking"],
        "unit": "km",
        "range": (1, 50)
    },
    "energy": {
        "metadata": ["homeElectricity", "solar"],
        "unit": "kWh",
        "range": (0.1, 10)
    },
    "food": {
        "metadata": ["vegan", "vegetarian", "meat"],
        "unit": "kg",
        "range": (0.1, 5)
    },
    "shopping": {
        "metadata": ["electronics", "clothing", "plastic", "glass"],
        "unit": "kg",
        "range": (0.1, 20)
    },
    "other": {  
        "metadata": ["misc", "unknown", "uncategorized"],
        "unit": "units",
        "range": (1, 100)
    }
}

TOTAL_RECORDS = 100  # Control how many records to generate

def random_timestamp_last_30_days():
    now = datetime.utcnow()
    past_date = now - timedelta(days=30)
    random_time = random.uniform(past_date.timestamp(), now.timestamp())
    return int(random_time)

def generate_random_activity():
    company_id = random.choice(list(company_users.keys()))
    user_id = random.choice(company_users[company_id])
    source = random.choice(sources)
    activity_type = random.choice(list(activity_types.keys()))
    metadata = random.choice(activity_types[activity_type]["metadata"])
    amount = round(random.uniform(*activity_types[activity_type]["range"]), 2)
    unit = activity_types[activity_type]["unit"]
    timestamp = random_timestamp_last_30_days()  # ✅ Timestamp spread across last month

    return {
        "company_id": company_id,
        "user_id": user_id,
        "source": source,
        "activity_type": activity_type,
        "metadata": metadata,
        "amount": amount,
        "unit": unit,
        "timestamp": timestamp
    }

def send_activity():
    data = generate_random_activity()
    try:
        response = requests.post(API_URL, json=data)
        if response.status_code == 200:
            print(f"✅ Sent: {data}")
        else:
            print(f"❌ Failed with status {response.status_code}: {response.text}")
    except Exception as e:
        print(f"❌ Exception: {e}")

if __name__ == "__main__":
    for _ in range(TOTAL_RECORDS):
        send_activity()
        time.sleep(random.uniform(1, 5))  # Random delay between 1 to 5 seconds

    print(f"\n✅ Successfully sent {TOTAL_RECORDS} records across last 1 month!")