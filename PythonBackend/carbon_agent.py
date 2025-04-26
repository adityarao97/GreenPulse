from uagents import Agent, Context, Model
from calculator import calculate_emission, calculate_daily_score, EMISSION_FACTORS, fix_activity_type
from llm_query import query_emission, classify_query_type, extract_activity_data, identify_emission_key, generate_general_advice, query_mapping, generate_emission_message
import requests
import time
from datetime import datetime, timedelta

from pymongo import MongoClient
import os

# ---------------------------
# ✅ MongoDB connection
# ---------------------------
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb+srv://adityarao:3yL9mZKRLbsibLSJ@cluster0.jguago1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
client = MongoClient(MONGO_URI)
db = client["carbon_footprint_db"]
user_profiles = db["user_profiles"]

# ---------------------------
# ✅ Models
# ---------------------------
class SubmitRequest(Model):
    message: str
    user: str
    user_type: str

class SubmitResponse(Model):
    response: str

carbon_bot = Agent(name="eco_bot", seed="eco123", port=8010, endpoint=["http://127.0.0.1:8010"])

# ---------------------------
# ✅ Helper Functions
# ---------------------------
def set_company_id(data):
    user_id = data["user_id"]
    user_num = int(user_id.replace("user", ""))
    if 1 <= user_num <= 5:
        data["company_id"] = "company1"
    elif 6 <= user_num <= 10:
        data["company_id"] = "company2"
    elif 11 <= user_num <= 15:
        data["company_id"] = "company3"
    else:
        data["company_id"] = "unknown"
    return data

def update_user_streak(user_id):
    today = datetime.utcnow().date()

    user = user_profiles.find_one({"user_id": user_id})

    if not user:
        # First time user
        user = {
            "user_id": user_id,
            "current_streak": 1,
            "last_logged_date": today.isoformat(),
            "total_points": 0,
            "total_emission_saved": 0,
            "badges_unlocked": [],
            "walking_km": 0,
            "plastic_kg": 0,
            "glass_kg": 0,
            "vegan_meals": 0,
            "solar_logs": 0
        }
        user_profiles.insert_one(user)
        return 1

    last_logged = datetime.strptime(user.get("last_logged_date"), "%Y-%m-%d").date()

    if last_logged == today:
        return user["current_streak"]
    elif last_logged == today - timedelta(days=1):
        new_streak = user["current_streak"] + 1
    else:
        new_streak = 1

    user_profiles.update_one(
        {"user_id": user_id},
        {"$set": {
            "current_streak": new_streak,
            "last_logged_date": today.isoformat()
        }}
    )

    return new_streak

def get_streak_bonus(streak_days):
    if streak_days >= 30:
        return 0.10
    elif streak_days >= 14:
        return 0.05
    elif streak_days >= 7:
        return 0.03
    elif streak_days >= 3:
        return 0.005
    else:
        return 0.0

# ---------------------------
# ✅ Main Handler
# ---------------------------
@carbon_bot.on_rest_post("/carbon", SubmitRequest, SubmitResponse)
async def handle_submit(ctx: Context, req: SubmitRequest) -> SubmitResponse:
    query_type = classify_query_type(req.message)

    if query_type == "log_activity":
        try:
            data = extract_activity_data(req.message)

            user_keyword = f"{data['activity_type']} {data['metadata']}"
            available_keys = list(EMISSION_FACTORS.keys())
            key = query_mapping(user_keyword, available_keys)
            key = fix_activity_type(key)

            if key not in EMISSION_FACTORS:
                return SubmitResponse(response=f"Sorry, I don't have emission data for {key}. Please try another activity.")

            data["emission"] = calculate_emission(key, data["amount"])

            if "metadata" not in data or data["metadata"] is None:
                data["metadata"] = "null"

            data["user_id"] = req.user
            data["source"] = "manual"
            data = set_company_id(data)
            data["timestamp"] = int(time.time())
            emission = data.pop("emission")
            print(data)

            try:
                response = requests.post("http://127.0.0.1:8001/send-activity", json=data)
                print(f"status code: {response.status_code} response: {response.text}")
            except Exception as e:
                ctx.logger.warning(f"Failed to forward data: {e}")

            # Step 4: Calculate Points
            base_points = calculate_daily_score(emission)

            # Step 5: Update Streak
            user_id = req.user
            updated_streak = update_user_streak(user_id)

            # Step 6: Bonus Application
            bonus_multiplier = get_streak_bonus(updated_streak)
            final_points = round(base_points * (1 + bonus_multiplier), 2)

            # Step 7: Update Points and Emission Saved
            user_profiles.update_one(
                {"user_id": user_id},
                {"$inc": {
                    "total_points": final_points,
                    "total_emission_saved": emission
                }}
            )

            # Step 8: Generate Final Message
            message = generate_emission_message(
                activity_type=data['activity_type'],
                amount=data['amount'],
                unit=data['unit'],
                emission=emission
            )

            message += (
                f"\n✅ You earned {final_points} points for this activity!"
                f"{' (Including a streak bonus!)' if bonus_multiplier > 0 else ''}"
                f"\n🔥 Current streak: {updated_streak} days."
            )

            return SubmitResponse(response=message)

        except Exception as e:
            return SubmitResponse(response=f"Error extracting activity: {e}")

    elif query_type == "specific_emission_query":
        emission_key = identify_emission_key(req.message, list(EMISSION_FACTORS.keys()))
        if emission_key in EMISSION_FACTORS:
            emission = EMISSION_FACTORS[emission_key]
            message = generate_emission_message(activity_type=data['activity_type'], amount=data['amount'], unit=data['unit'], emission=data['emission'])
            return SubmitResponse(response=message)
        return SubmitResponse(response="Error generating response")

    elif query_type == "general_emission_advice":
        try:
            response = requests.get("http://localhost:8005/fetch-activity/", params={"user_type": req.user_type.lower(), "identifier": req.user})
            data = response.json()
            total_emission = data.get("total").get("total_emission", 0.0)
            activities = data.get("total").get("activity_type_breakdown")

            activities_summary = ""
            for key, val in activities.items():
                activities_summary += f"- {val} of {key}\n"

            advice = generate_general_advice(activities_summary, total_emission)

            return SubmitResponse(response=advice)

        except Exception as e:
            return SubmitResponse(response=f"Error fetching or analyzing user emissions: {e}")

    return SubmitResponse(response="I couldn’t understand your request. Try rephrasing it or using simpler language.")

if __name__ == "__main__":
    carbon_bot.run()
