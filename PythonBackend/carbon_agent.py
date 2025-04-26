from uagents import Agent, Context, Model
from calculator import calculate_emission, calculate_daily_score, EMISSION_FACTORS, fix_activity_type
from llm_query import query_emission, classify_query_type, extract_activity_data, identify_emission_key, generate_general_advice, query_mapping, generate_emission_message
import requests
import time

class SubmitRequest(Model):
    message: str
    user: str
    user_type: str

class SubmitResponse(Model):
    response: str

carbon_bot = Agent(name="eco_bot", seed="eco123", port=8010, endpoint=["http://127.0.0.1:8010"])

def set_company_id(data):
    user_id = data["user_id"]
    
    # Extract the numeric part from user_id like "user1" -> 1
    user_num = int(user_id.replace("user", ""))
    
    if 1 <= user_num <= 5:
        data["company_id"] = "company1"
    elif 6 <= user_num <= 10:
        data["company_id"] = "company2"
    elif 11 <= user_num <= 15:
        data["company_id"] = "company3"
    else:
        data["company_id"] = "unknown"  # Optional fallback if outside range

    return data

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
            key = query_mapping(user_keyword, available_keys)

            key = fix_activity_type(key)

            if key not in EMISSION_FACTORS:
                return SubmitResponse(response=f"Sorry, I don't have emission data for {key}. Please try another activity.")

            data["emission"] = calculate_emission(key, data["amount"])

            if "metadata" not in data or data["metadata"] is None:
                data["metadata"] = "null"
            
            data["user_id"] = req.user
            data["source"] = "manual"
            data = set_company_id(data)
            data["timestamp"] = int(time.time())
            emission = data.pop("emission")
            print(data)

            try:
                response = requests.post("http://127.0.0.1:8001/send-activity", json=data)
                print(f"status code : {response.status_code} response message : {response.text}")
            except Exception as e:
                ctx.logger.warning(f"Failed to forward data via REST: {e}")

            data["emission"] = emission
            message = generate_emission_message(activity_type=data['activity_type'], amount=data['amount'], unit=data['unit'], emission=data['emission'])
            return SubmitResponse(response=message)

        except Exception as e:
            return SubmitResponse(response=f"Error extracting activity: {e}")


    elif query_type == "specific_emission_query":
        emission_key = identify_emission_key(req.message, list(EMISSION_FACTORS.keys()))
        if emission_key in EMISSION_FACTORS:
            emission = EMISSION_FACTORS[emission_key]
            message = generate_emission_message(activity_type=data['activity_type'], amount=data['amount'], unit=data['unit'], emission=data['emission'])
            return SubmitResponse(response=message)
        return SubmitResponse(response=f"Error generating response")

    elif query_type == "general_emission_advice":
        try:
            response = requests.get("http://localhost:8005/fetch-activity/", params={"user_type": req.user_type.lower(), "identifier": req.user})
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

if __name__ == "__main__":
    carbon_bot.run()