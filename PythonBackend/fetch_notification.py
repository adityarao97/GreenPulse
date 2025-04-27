from fastapi import FastAPI, Query
from pymongo import MongoClient
from datetime import datetime
from typing import Optional

app = FastAPI()
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)
# MongoDB Setup
MONGO_URI = "mongodb+srv://adityarao:3yL9mZKRLbsibLSJ@cluster0.jguago1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["carbon_footprint_db"]
collection = db["notifications"]

@app.get("/get-notification/")
async def get_notification(location: Optional[str] = "Los Angeles"):
    # ✅ Fetch the latest notification and delete it
    latest_notification = collection.find_one_and_delete(
        {"location": location},
        sort=[("timestamp", -1)]
    )

    if latest_notification:
        return {
            "location": latest_notification["location"],
            "category": latest_notification["category"],
            "notification": latest_notification["notification"],
            "timestamp": latest_notification["timestamp"]
        }
    else:
        return {"message": "No notifications available."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("fetch_notification:app", host="127.0.0.1", port=8008, reload=True)