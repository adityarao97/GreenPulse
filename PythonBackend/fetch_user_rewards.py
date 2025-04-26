from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from pymongo import MongoClient
from typing import Optional, List

# -----------------------------
# ✅ MongoDB Connection
# -----------------------------
MONGO_URI = "mongodb+srv://adityarao:3yL9mZKRLbsibLSJ@cluster0.jguago1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["carbon_footprint_db"]
collection = db["user_profiles"]

# -----------------------------
# ✅ FastAPI App Setup
# -----------------------------
app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# -----------------------------
# ✅ Response Model
# -----------------------------
class RewardResponse(BaseModel):
    user_id: str
    current_streak: int
    last_logged_date: Optional[str]
    total_points: int
    total_emission_saved: float
    badges_unlocked: List[str]
    walking_km: float
    plastic_kg: float
    glass_kg: float
    vegan_meals: int
    solar_logs: int

# -----------------------------
# ✅ GET API to Fetch Reward Info
# -----------------------------
@app.get("/reward", response_model=RewardResponse)
async def get_user_reward(user_id: str = Query(..., description="User ID to fetch reward data for")):
    user_profile = collection.find_one({"user_id": user_id})

    if not user_profile:
        # Return default values if the user profile is not found
        return RewardResponse(
            user_id=user_id,
            current_streak=0,
            last_logged_date=None,
            total_points=0,
            total_emission_saved=0.0,
            badges_unlocked=[],
            walking_km=0.0,
            plastic_kg=0.0,
            glass_kg=0.0,
            vegan_meals=0,
            solar_logs=0
        )

    return RewardResponse(
        user_id=user_profile.get("user_id", ""),
        current_streak=user_profile.get("current_streak", 0),
        last_logged_date=user_profile.get("last_logged_date"),
        total_points=user_profile.get("total_points", 0),
        total_emission_saved=user_profile.get("total_emission_saved", 0.0),
        badges_unlocked=user_profile.get("badges_unlocked", []),
        walking_km=user_profile.get("walking_km", 0.0),
        plastic_kg=user_profile.get("plastic_kg", 0.0),
        glass_kg=user_profile.get("glass_kg", 0.0),
        vegan_meals=user_profile.get("vegan_meals", 0),
        solar_logs=user_profile.get("solar_logs", 0)
    )

# -----------------------------
# ✅ Run the app (if running standalone)
# -----------------------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fetch_user_rewards:app", host="127.0.0.1", port=8006, reload=True)
