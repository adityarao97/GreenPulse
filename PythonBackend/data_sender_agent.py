from uagents import Agent, Context, Model
import time

# ----------------------------
# Define Message Schemas
# ----------------------------
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

# ----------------------------
# Emission Calculation Logic
# ----------------------------
def calculate_emission(activity_type, metadata, amount, unit):
    emission = 0.0

    if activity_type == "transportation":
        if metadata == "walking":
            emission = 0.0
        elif metadata == "public":
            emission = amount * 0.1  # Example: 0.1 kg CO2e per km for public transport
        elif metadata == "private":
            emission = amount * 0.25  # Example: 0.25 kg CO2e per km for private vehicles

    elif activity_type == "energy":
        if metadata == "homeElectricity" and unit == "kWh":
            emission = amount * 0.5  # Example: 0.5 kg CO2e per kWh (depends on grid mix)
        elif metadata == "solar":
            emission = amount * 0.05  # Much lower emissions for solar energy

    elif activity_type == "food":
        if metadata == "vegan":
            emission = amount * 1.5  # Example: kg of food x 1.5 kg CO2e
        elif metadata == "vegetarian":
            emission = amount * 2.5
        elif metadata == "meat":
            emission = amount * 7.0  # Much higher footprint for meat

    elif activity_type == "shopping":
        if metadata == "electronics":
            emission = amount * 15.0  # Example: kg of electronics x 15 kg CO2e
        elif metadata == "clothing":
            emission = amount * 5.0
        elif metadata == "plastic":
            emission = amount * 6.0
        elif metadata == "glass":
            emission = amount * 4.0

    return emission

# ----------------------------
# Sender Agent Setup
# ----------------------------
sender_agent = Agent(
    name="rest_data_sender",
    seed="rest-sender-seed-789",
    port=8001,
    endpoint=["http://127.0.0.1:8001/submit"]
)

# ----------------------------
# REST Endpoint Handler
# ----------------------------
@sender_agent.on_rest_post("/send-activity", ActivityInput, ResponseMessage)
async def handle_send_activity(ctx: Context, data: ActivityInput) -> ResponseMessage:
    emission_value = calculate_emission(
        data.activity_type,
        data.metadata,
        data.amount,
        data.unit
    )

    message = ActivityMessage(
        company_id=data.company_id,
        user_id=data.user_id,
        source=data.source,
        activity_type=data.activity_type,
        metadata=data.metadata,
        amount=data.amount,
        emission=emission_value,
        unit=data.unit,
        timestamp=data.timestamp
    )

    await ctx.send(CARBON_AGENT_ADDRESS, message)
    ctx.logger.info(f"📤 Sent message to carbon_agent with emission calculated: {message}")

    return ResponseMessage(
        timestamp=int(time.time()),
        status="✅ Message forwarded to carbon_agent with emission calculated",
        agent_address=ctx.agent.address
    )

if __name__ == "__main__":
    sender_agent.run()