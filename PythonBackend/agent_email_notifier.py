from uagents import Agent, Context
from pymongo import MongoClient
import yagmail

# MongoDB Setup
MONGO_URI = "mongodb+srv://adityarao:3yL9mZKRLbsibLSJ@cluster0.jguago1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["carbon_footprint_db"]
collection = db["notifications"]

# Email Configuration
email_sender = "aayushis2504@gmail.com"
email_password = "erpn mzwa qbbo eikv"
email_recipient = "adi97rao@gmail.com"

# Initialize Yagmail SMTP
yag = yagmail.SMTP(email_sender, email_password)

# Configurable Inputs
notification_interval_minutes = 1

# Create the Email Notification Agent
email_agent = Agent(name="email_notification_agent", seed="email_notification_secret", port=8011, endpoint=["127.0.0.1:8011"])

@email_agent.on_interval(period=notification_interval_minutes * 60)
async def send_email_notification(ctx: Context):
    try:
        # Read the latest notification from file
        latest_notification = collection.find_one(sort=[("timestamp", -1)])
        # Build a clean simple centered eco-friendly email
        html_email_content = f"""
        <html>
            <body style="margin: 0; padding: 0; background-color: #e6f2e6; font-family: Arial, sans-serif;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px; background-color: #ffffff; padding: 40px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                    <tr>
                        <td align="center" style="padding-bottom: 20px;">
                            <h1 style="color: #2e7d32; font-size: 28px;">🌱 GreenPulse Eco Notification 🌱</h1>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" style="padding-bottom: 30px;">
                            <p style="font-size: 18px; color: #333333;">{latest_notification["notification"]}</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center">
                            <p style="font-size: 14px; color: #777;">Thank you for being part of GreenPulse 🌎</p>
                        </td>
                    </tr>
                </table>
            </body>
        </html>
        """

        # Send the email
        yag.send(
            to=email_recipient,
            subject="🌱 Your Scheduled GreenPulse Notification 📩",
            contents=html_email_content
        )
        ctx.logger.info(f"[EMAIL SENT] Notification delivered to {email_recipient}")
    
    except FileNotFoundError:
        ctx.logger.error("No notification available yet. Waiting for next push.")

if __name__ == "__main__":
    email_agent.run()