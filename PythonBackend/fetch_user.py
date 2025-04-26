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

    # Aggregate by activity type
    activity_type_agg = {}
    for r in records:
        activity_type_agg[r["activity_type"]] = activity_type_agg.get(r["activity_type"], 0) + r["emission"]

    return total_emission, activity_type_agg

def generate_time_buckets(start_time: datetime, end_time: datetime, segments: int):
    delta = (end_time - start_time) / segments
    buckets = []
    for i in range(segments):
        buckets.append((start_time + delta * i, start_time + delta * (i + 1)))
    return buckets

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

# -----------------------------
# ✅ GET API with Aggregation and Bucketing
# -----------------------------
@app.get("/fetch-activity/")
async def fetch_activity(
    user_type: str = Query(..., description="Employee or Company"),
    identifier: str = Query(..., description="user_id if Employee, company_id if Company")
):
    if user_type not in ["Employee", "Company"]:
        raise HTTPException(status_code=400, detail="user_type must be 'Employee' or 'Company'")

    query_field = "user_id" if user_type == "Employee" else "company_id"

    results = list(collection.find({query_field: identifier}, {"_id": 0}))

    if not results:
        raise HTTPException(status_code=404, detail="No data found for the given query.")

    # Aggregations
    total_emission, activity_type_agg = aggregate_emissions(results)

    daily_emission_breakdown = bucket_emissions(results, segments=6, period_days=1)
    weekly_emission_breakdown = bucket_emissions(results, segments=6, period_days=7)
    monthly_emission_breakdown = bucket_emissions(results, segments=6, period_days=30)

    return {
        "data": results,
        "total": {
            "total_emission": round(total_emission, 2),
            "activity_type_breakdown": {k: round(v, 2) for k, v in activity_type_agg.items()},
            "daily_emission_breakdown": daily_emission_breakdown,
            "weekly_emission_breakdown": weekly_emission_breakdown,
            "monthly_emission_breakdown": monthly_emission_breakdown
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fetch_user:app", host="127.0.0.1", port=8005, reload=True)