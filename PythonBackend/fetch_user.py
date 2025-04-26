from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from pymongo import MongoClient
from typing import List
from datetime import datetime, timedelta

app = FastAPI()

# -----------------------------
# ✅ MongoDB Connection
# -----------------------------
MONGO_URI = "mongodb+srv://adityarao:3yL9mZKRLbsibLSJ@cluster0.jguago1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["carbon_footprint_db"]
collection = db["activity_logs"]

# -----------------------------
# ✅ Response Schema
# -----------------------------
class ActivityRecord(BaseModel):
    company_id: str
    user_id: str
    source: str
    activity_type: str
    metadata: str
    amount: float
    unit: str
    emission: float
    sender_address: str
    timestamp: int

# -----------------------------
# ✅ Utility Functions
# -----------------------------
def aggregate_emissions(records):
    total_emission = sum(r["emission"] for r in records)
    activity_type_agg = {}
    for r in records:
        activity_type_agg[r["activity_type"]] = activity_type_agg.get(r["activity_type"], 0) + r["emission"]
    return total_emission, activity_type_agg

def generate_time_buckets(start_time: datetime, end_time: datetime, segments: int):
    delta = (end_time - start_time) / segments
    return [(start_time + delta * i, start_time + delta * (i + 1)) for i in range(segments)]

def bucket_emissions(records, segments, period_days):
    now = datetime.utcnow()
    start_time = now - timedelta(days=period_days)
    buckets = generate_time_buckets(start_time, now, segments)
    emissions_per_bucket = []
    for bucket_start, bucket_end in buckets:
        bucket_sum = sum(
            r["emission"]
            for r in records
            if bucket_start <= datetime.utcfromtimestamp(r["timestamp"]) < bucket_end
        )
        emissions_per_bucket.append({
            "start": bucket_start.isoformat(),
            "end": bucket_end.isoformat(),
            "emission": round(bucket_sum, 2)
        })
    return emissions_per_bucket

def calculate_top_users(records, top_n=3):
    user_emissions = {}
    for r in records:
        user_emissions[r["user_id"]] = user_emissions.get(r["user_id"], 0) + r["emission"]
    sorted_users = sorted(user_emissions.items(), key=lambda x: x[1], reverse=True)[:top_n]
    return [{"user_id": user, "total_emission": round(emission, 2)} for user, emission in sorted_users]

def get_company_leaderboard():
    all_records = list(collection.find({}, {"_id": 0}))
    company_emissions = {}
    for r in all_records:
        company_emissions[r["company_id"]] = company_emissions.get(r["company_id"], 0) + r["emission"]
    leaderboard = sorted(company_emissions.items(), key=lambda x: x[1])  # Ascending order
    return [{"company_id": company, "total_emission": round(emission, 2)} for company, emission in leaderboard]

# -----------------------------
# ✅ GET API with Aggregation, Bucketing, Top Users, and Company Leaderboard
# -----------------------------
@app.get("/fetch-activity/")
async def fetch_activity(
    user_type: str = Query(..., description="employee or company"),
    identifier: str = Query(..., description="user_id if employee, company_id if company")
):
    if user_type not in ["employee", "company"]:
        raise HTTPException(status_code=400, detail="user_type must be 'employee' or 'company'")

    query_field = "user_id" if user_type == "employee" else "company_id"
    results = list(collection.find({query_field: identifier}, {"_id": 0}))

    if not results:
        raise HTTPException(status_code=404, detail="No data found for the given query.")

    total_emission, activity_type_agg = aggregate_emissions(results)
    daily_emission_breakdown = bucket_emissions(results, segments=6, period_days=1)
    weekly_emission_breakdown = bucket_emissions(results, segments=6, period_days=7)
    monthly_emission_breakdown = bucket_emissions(results, segments=6, period_days=30)

    total_object = {
        "total_emission": round(total_emission, 2),
        "activity_type_breakdown": {k: round(v, 2) for k, v in activity_type_agg.items()},
        "daily_emission_breakdown": daily_emission_breakdown,
        "weekly_emission_breakdown": weekly_emission_breakdown,
        "monthly_emission_breakdown": monthly_emission_breakdown
    }

    if user_type == "company":
        top_users = calculate_top_users(results)
        total_object["top_3_users"] = top_users
        company_leaderboard = get_company_leaderboard()  # ✅ New leaderboard logic
        total_object["companyLeaderboard"] = company_leaderboard

    return {
        "data": results,
        "total": total_object
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fetch_user:app", host="127.0.0.1", port=8005, reload=True)