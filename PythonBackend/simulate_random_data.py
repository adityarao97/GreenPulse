import requests
import random
import time

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
    "commute": {"unit": "km", "range": (1, 50)},
    "electricity": {"unit": "kWh", "range": (0.1, 10)},
    "steps": {"unit": "steps", "range": (1000, 15000)},
    "flight": {"unit": "km", "range": (500, 5000)}
}

TOTAL_RECORDS = 100  # ✅ Control how many records to generate

def generate_random_activity():
    company_id = random.choice(list(company_users.keys()))
    user_id = random.choice(company_users[company_id])
    source = random.choice(sources)
    activity_type = random.choice(list(activity_types.keys()))
    amount = round(random.uniform(*activity_types[activity_type]["range"]), 2)
    unit = activity_types[activity_type]["unit"]
    timestamp = int(time.time())

    # ✅ Metadata logic:
    metadata = random.choice(["private", "public"]) if activity_type == "commute" else "null"

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

    print(f"\n✅ Successfully sent {TOTAL_RECORDS} records!")