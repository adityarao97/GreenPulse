from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from pymongo import MongoClient
from typing import List
from datetime import datetime, timedelta

app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

MONGO_URI = "mongodb+srv://adityarao:3yL9mZKRLbsibLSJ@cluster0.jguago1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["carbon_footprint_db"]
collection = db["activity_logs"]

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

def aggregate_emissions(records):
    total_emission = sum(r["emission"] for r in records)
    activity_type_agg = {}
    for r in records:
        activity_type_agg[r["activity_type"]] = activity_type_agg.get(r["activity_type"], 0) + r["emission"]
    return total_emission, activity_type_agg

def generate_date_ranges(period: str, segments: int):
    now = datetime.utcnow()
    ranges = []

    if period == "daily":
        for i in range(segments):
            end = now - timedelta(days=i)
            start = end - timedelta(days=1)
            ranges.append((start.replace(hour=0, minute=0, second=0, microsecond=0),
                           end.replace(hour=0, minute=0, second=0, microsecond=0)))
        ranges.reverse()

    elif period == "weekly":
        current_week_start = (now - timedelta(days=now.weekday())).replace(hour=0, minute=0, second=0, microsecond=0)
        for i in range(segments):
            end = current_week_start - timedelta(weeks=i)
            start = end - timedelta(weeks=1)
            ranges.append((start, end))
        ranges.reverse()

    elif period == "monthly":
        for i in range(segments):
            month = (now.month - i - 1) % 12 + 1
            year = now.year - ((now.month - i - 1) // 12)
            start = datetime(year, month, 1)
            if month == 12:
                end = datetime(year + 1, 1, 1)
            else:
                end = datetime(year, month + 1, 1)
            ranges.append((start, end))
        ranges.reverse()

    else:
        raise ValueError("Invalid period")

    return ranges

def bucket_emissions(records, period: str, segments: int):
    buckets = generate_date_ranges(period, segments)
    breakdown = []
    for bucket_start, bucket_end in buckets:
        bucket_sum = sum(
            r["emission"]
            for r in records
            if bucket_start <= datetime.utcfromtimestamp(r["timestamp"]) < bucket_end
        )
        breakdown.append({
            "start": bucket_start.isoformat(),
            "end": bucket_end.isoformat(),
            "emission": round(bucket_sum, 2)
        })
    return breakdown
    
def calculate_top_users(records, top_n=3):
    user_emissions = {}
    for r in records:
        user_emissions[r["user_id"]] = user_emissions.get(r["user_id"], 0) + r["emission"]

    sorted_users = sorted(user_emissions.items(), key=lambda x: x[1], reverse=False)[:top_n]
    return [{"user_id": user, "total_emission": round(emission, 2)} for user, emission in sorted_users]

def generate_company_leaderboard():
    all_records = list(collection.find({}, {"_id": 0, "company_id": 1, "emission": 1}))
    company_emissions = {}

    for r in all_records:
        company = r.get("company_id")
        if company:
            company_emissions[company] = company_emissions.get(company, 0) + r["emission"]

    sorted_companies = sorted(company_emissions.items(), key=lambda x: x[1])  # Increasing order
    return [{"company_id": company, "total_emission": round(emission, 2)} for company, emission in sorted_companies]



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
    daily_emission_breakdown = bucket_emissions(results, period="daily", segments=6)
    weekly_emission_breakdown = bucket_emissions(results, period="weekly", segments=6)
    monthly_emission_breakdown = bucket_emissions(results, period="monthly", segments=6)

    total_object = {
        "total_emission": round(total_emission, 2),
        "activity_type_breakdown": {k: round(v, 2) for k, v in activity_type_agg.items()},
        "daily_emission_breakdown": daily_emission_breakdown,
        "weekly_emission_breakdown": weekly_emission_breakdown,
        "monthly_emission_breakdown": monthly_emission_breakdown
    }
    
    if user_type == "company":
        top_users = calculate_top_users(results)
        unique_users = {r["user_id"] for r in results if "user_id" in r}
        total_object["total_users"] = len(unique_users)
        total_object["top_3_users"] = top_users
        total_object["companyLeaderboard"] = generate_company_leaderboard()

    return {
        "data": results,
        "total": total_object
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fetch_user:app", host="127.0.0.1", port=8005, reload=True)
