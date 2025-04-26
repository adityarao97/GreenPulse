from uagents import Agent, Context, Model
from calculator import calculate_emission, calculate_daily_score, EMISSION_FACTORS, fix_activity_type
from llm_query import query_emission, classify_query_type, extract_activity_data, identify_emission_key, generate_general_advice, query_mapping
import requests

class SubmitRequest(Model):
    message: str

class SubmitResponse(Model):
    response: str

carbon_bot = Agent(name="eco_bot", seed="eco123", port=8010)

@carbon_bot.on_rest_post("/carbon", SubmitRequest, SubmitResponse)
async def handle_submit(ctx: Context, req: SubmitRequest) -> SubmitResponse:
    query_type = classify_query_type(req.message)

    if query_type == "log_activity":
        try:
            data = extract_activity_data(req.message)

            # Step 1: Build a better matching keyword
            user_keyword = f"{data['activity_type']} {data['metadata']}"

            # Step 2: Ask LLM to map it
            available_keys = list(EMISSION_FACTORS.keys())
            mapped_key = query_mapping(user_keyword, available_keys)

            # Step 3: Update the data
            data["activity_type"] = mapped_key


            # Fix activity type using keyword mapping
            data["activity_type"] = fix_activity_type(data["activity_type"])

            key = f"{data['activity_type']}"

            if key not in EMISSION_FACTORS:
                return SubmitResponse(response=f"Sorry, I don't have emission data for {key}. Please try another activity.")

            data["emission"] = calculate_emission(key, data["amount"])

            if "metadata" not in data or data["metadata"] is None:
                data["metadata"] = "null"

            try:
                requests.post("http://localhost:8001/send-activity/", json=data)
            except Exception as e:
                ctx.logger.warning(f"Failed to forward data via REST: {e}")

            return SubmitResponse(response=f"If you {data['activity_type']} for {data['amount']} {data['unit']}, you emitted {data['emission']} kg CO₂e.")

        except Exception as e:
            return SubmitResponse(response=f"Error extracting activity: {e}")


    elif query_type == "specific_emission_query":
        emission_key = identify_emission_key(req.message, list(EMISSION_FACTORS.keys()))
        if emission_key in EMISSION_FACTORS:
            emission = EMISSION_FACTORS[emission_key]
            return SubmitResponse(response=f"The emission factor for {emission_key} is {emission} kg CO₂e per unit.")
        return SubmitResponse(response=query_emission(req.message))

    elif query_type == "general_emission_advice":
        try:
            response = requests.get("http://localhost:8005/fetch-activity/", params={"user_type": "Employee", "identifier": "user1"})
            data = response.json()
            total_emission = data.get("total").get("total_emission", 0.0)
            print("total_emission: ", total_emission)
            activities = data.get("total").get("activity_type_breakdown")
            print("activities summary: ", activities)
            activities_summary = "" 
            # Build a simple bullet list of user activities                                                                                                                                                           
          
            for key,val in activities.items():
                act_type = key
                amount = val
                activities_summary += f"- {amount} of {act_type}\n"
            print("summary: ",activities_summary)
            

            # Call LLM to generate natural advice
            advice = generate_general_advice(activities_summary, total_emission)

            return SubmitResponse(response=advice)

        except Exception as e:
            return SubmitResponse(response=f"Error fetching or analyzing user emissions: {e}")

    return SubmitResponse(response="I couldn’t understand your request. Try rephrasing it or using simpler language.")
