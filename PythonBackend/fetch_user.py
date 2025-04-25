from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from pymongo import MongoClient
from typing import List

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
    sender_address: str
    timestamp: int

# -----------------------------
# ✅ GET API with Pagination
# -----------------------------
@app.get("/fetch-activity/", response_model=List[ActivityRecord])
async def fetch_activity(
    user_type: str = Query(..., description="Employee or Company"),
    identifier: str = Query(..., description="user_id if Employee, company_id if Company"),
    # page: int = Query(1, ge=1, description="Page number (default: 1)"),
    # limit: int = Query(10, ge=1, le=100, description="Number of records per page (default: 10, max: 100)")
):
    if user_type not in ["Employee", "Company"]:
        raise HTTPException(status_code=400, detail="user_type must be 'Employee' or 'Company'")

    query_field = "user_id" if user_type == "Employee" else "company_id"
    # skip_count = (page - 1) * limit

    results = list(
        collection.find({query_field: identifier}, {"_id": 0})
        # .skip(skip_count)
        # .limit(limit)
    )

    if not results:
        raise HTTPException(status_code=404, detail="No data found for the given query.")

    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fetch_user:app", host="127.0.0.1", port=8005, reload=True)