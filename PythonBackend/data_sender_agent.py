from uagents import Agent, Context, Model
import time

# Define the message schema
class ActivityMessage(Model):
    company_id: str
    user_id: str
    source: str
    activity_type: str
    metadata: str 
    amount: float
    unit: str
    timestamp: float

class ActivityInput(Model):  # REST request body
    company_id: str
    user_id: str
    source: str
    activity_type: str
    metadata: str 
    amount: float
    unit: str
    timestamp: float

class ResponseMessage(Model):  # REST response body
    timestamp: int
    status: str
    agent_address: str

CARBON_AGENT_ADDRESS = "agent1qgvqe400d0h8w8c53d70lgff5exgn0qmy0x6ws5kmqq860dkauzsxemu80z"

# Initialize the sender agent
sender_agent = Agent(
    name="rest_data_sender",
    seed="rest-sender-seed-789",
    port=8001,
    endpoint=["http://127.0.0.1:8001/submit"]
)

# REST endpoint to receive activity data and forward it to the carbon agent
@sender_agent.on_rest_post("/send-activity", ActivityInput, ResponseMessage)
async def handle_send_activity(ctx: Context, data: ActivityInput) -> ResponseMessage:
    message = ActivityMessage(**data.dict())
    await ctx.send(CARBON_AGENT_ADDRESS, message)
    ctx.logger.info(f"📤 Sent message to carbon_agent: {message}")

    return ResponseMessage(
        timestamp=int(time.time()),
        status="✅ Message forwarded to carbon_agent",
        agent_address=ctx.agent.address
    )

if __name__ == "__main__":
    sender_agent.run()