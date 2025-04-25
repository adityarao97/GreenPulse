from uagents import Agent, Context, Model
from pymongo import MongoClient
import os

# -----------------------------
# ✅ MongoDB Setup
# -----------------------------
# Replace with your actual MongoDB URI if needed
MONGO_URI = os.getenv(
    "MONGO_URI",
    "mongodb+srv://adityarao:3yL9mZKRLbsibLSJ@cluster0.jguago1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
)
client = MongoClient(MONGO_URI)
db = client["carbon_footprint_db"]
collection = db["activity_logs"]

# -----------------------------
# ✅ Define Message Schema
# -----------------------------
class ActivityMessage(Model):
    company_id: str
    user_id: str
    source: str
    activity_type: str
    metadata: str 
    amount: float
    emission: float  # Emission in kg CO2e
    unit: str
    timestamp: float

# -----------------------------
# ✅ Collector Agent Setup
# -----------------------------
carbon_agent = Agent(
    name="carbon_collector",
    seed="carbon-collector-seed-123",  # ✅ Fixed seed = consistent agent address
    port=8000,
    endpoint=["http://127.0.0.1:8000/submit"]
)

# -----------------------------
# ✅ Message Handler with MongoDB Insert
# -----------------------------
@carbon_agent.on_message(model=ActivityMessage)
async def handle_activity_data(ctx: Context, sender: str, msg: ActivityMessage):
    try:
        # Prepare the document for MongoDB insertion
        record = {
            "company_id": msg.company_id,
            "user_id": msg.user_id,
            "source": msg.source,
            "activity_type": msg.activity_type,
            "metadata": msg.metadata,
            "amount": msg.amount,
            "unit": msg.unit,
            "emission": msg.emission,                  # ✅ Emission value properly stored
            "sender_address": sender,
            "timestamp": msg.timestamp
        }

        # Insert into MongoDB collection
        collection.insert_one(record)
        ctx.logger.info(f"✅ Successfully stored data in MongoDB from {sender}: {record}")

    except Exception as e:
        ctx.logger.error(f"❌ Error storing data into MongoDB: {e}")

if __name__ == "__main__":
    carbon_agent.run()
