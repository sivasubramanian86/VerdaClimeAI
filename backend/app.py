import os
import requests
from flask import Flask, jsonify, request
from flask_cors import CORS
from transformers import AutoModelForCausalLM, AutoTokenizer
from dotenv import load_dotenv
import json

# Load environment variables from a .env file
load_dotenv()

app = Flask(__name__)
# Enable CORS for the Flask app
CORS(app)

# Load the LLAMA4 SCOUT 17B 16E Instruct model and tokenizer
#model_name = "llama4-scout-17b-16e-instruct"  # Replace with the actual model path or name
#model = AutoModelForCausalLM.from_pretrained(model_name)
#tokenizer = AutoTokenizer.from_pretrained(model_name)

# Update the Mistral model name to the correct one
#mistral_model_name = "mistralai/Mixtral-8x7B-Instruct-v0.1"  # Updated model name
#mistral_model = AutoModelForCausalLM.from_pretrained(mistral_model_name)
#mistral_tokenizer = AutoTokenizer.from_pretrained(mistral_model_name)

# Use environment variables for the base URL
BASE_URL = os.getenv('BASE_URL', 'http://localhost:5000')

@app.route('/weather', methods=['GET'])
def get_weather():
    """Return weather data using Mistral or fallback to dummy data."""
    try:
        # Fetch data from Mistral endpoint
        response = requests.post(
            f"{BASE_URL}/api/mistral",
            json={"input": "Provide weather data for crop management."}
        )
        if response.status_code == 200:
            return jsonify(response.json())
    except Exception as e:
        pass

    # Fallback to dummy data
    return jsonify({
        'temperature': 25,
        'rainfall': 12,
        'wind': 15,
        'soilMoisture': 45,
        'hailstorm': 'No hailstorm expected'
    })

@app.route('/crop-health', methods=['GET'])
def get_crop_health():
    """Return crop health alerts using Mistral or fallback to dummy data."""
    try:
        response = requests.post(
            f"{BASE_URL}/api/mistral",
            json={"input": "Provide crop health alerts for farmers."}
        )
        if response.status_code == 200:
            return jsonify(response.json())
    except Exception as e:
        pass

    return jsonify({
        'alerts': [
            'Hailstorm expected in northern regions affecting wheat.',
            'Rice crops showing signs of fungal infection in eastern regions.'
        ]
    })

@app.route('/advisory', methods=['GET'])
def get_advisory():
    """Return dummy crop advisory."""
    return jsonify({
        'advisory': 'Apply nitrogen-based fertilizers to wheat crops this week.'
    })

@app.route('/api/pest-detection', methods=['GET'])
def pest_detection():
    """Return pest detection data using Mistral or fallback to dummy data."""
    try:
        response = requests.post(
            f"{BASE_URL}/api/mistral",
            json={"input": "Provide pest detection data for crops."}
        )
        if response.status_code == 200:
            return jsonify(response.json())
    except Exception as e:
        pass

    return jsonify([
        {"name": "Aphids", "riskLevel": "High"},
        {"name": "Whiteflies", "riskLevel": "Moderate"},
        {"name": "Spider Mites", "riskLevel": "Low"}
    ])

# New endpoint to interact with the LLM model
@app.route('/api/llm', methods=['POST'])
def interact_with_llm():
    """Interact with the LLM model using user input."""

    # Get user input from the request
    user_input = request.json.get('input', '')

    # LLM API details (to be updated with your API key and URL)
    llm_api_url = os.getenv('LLM_API_URL', 'https://api.example.com/llm')
    llm_api_key = os.getenv('LLM_API_KEY', 'your-api-key')

    # Make a request to the LLM API
    response = requests.post(
        llm_api_url,
        headers={
            'Authorization': f'Bearer {llm_api_key}',
            'Content-Type': 'application/json'
        },
        json={"input": user_input}
    )

    # Return the LLM response to the frontend
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to interact with LLM"}), response.status_code

@app.route('/api/llama4', methods=['POST'])
def interact_with_llama4():
    """Interact with the LLAMA4 model using E2E Networks API."""
    from flask import request

    # Get user input from the request
    user_input = request.json.get('input', '')

    # E2E Networks API details
    e2e_api_url = "https://api.e2enetworks.com/llama4"
    hugging_face_token = os.getenv('HUGGING_FACE_TOKEN', 'your-hugging-face-token')

    # Make a request to the E2E Networks API
    response = requests.post(
        e2e_api_url,
        headers={
            'Authorization': f'Bearer {hugging_face_token}',
            'Content-Type': 'application/json'
        },
        json={"input": user_input}
    )

    # Return the response to the frontend
    if response.status_code == 200:
        return jsonify(response.json())
    else:
        return jsonify({"error": "Failed to interact with LLAMA4 model"}), response.status_code

@app.route('/api/mistral', methods=['POST'])
def interact_with_mistral():
    """Interact with the Mistral model using E2E Networks API."""

    # Get user input from the request
    user_input = request.json.get('input', '')
    district = request.json.get('district', 'Unknown District')

    # Refine the input prompt for better results
    refined_prompt = refined_prompt = (
    f"Generate a structured JSON object with detailed agricultural data for the dashboard in {district}. "
    "The JSON must include exactly the following keys and nested structure: "
    "1. 'weather': an object that contains: "
    "   - 'temperature': an object with 'currentValue' (numeric), 'units' (string), and 'dataSource' (string); "
    "   - 'rainfall': an object with 'currentValue' (numeric), 'units' (string), and 'history' with 'last7Days' and 'last30Days' as arrays of numbers; "
    "   - 'hailstormAlerts': an object with 'currentAlerts' (array) and 'previousAlerts' (array of objects, each with 'alertTime' (ISO timestamp) and 'severity' (string)); "
    "   - 'soilMoisture': an object with 'currentLevel' (numeric), 'units' (string), and 'history' containing 'last7Days' and 'last30Days' arrays of numbers; "
    "   - 'windSpeed': an object with 'currentValue' (numeric), 'units' (string), and 'dataSource' (string). "
    "2. 'cropHealth': an object that contains: "
    "   - 'currentCropCondition' (string), "
    "   - 'yieldPrediction': an object with 'predictedValue' (numeric), 'units' (string), 'confidence' (numeric), and 'dataSource' (string); "
    "   - 'growthStage' (string), "
    "   - 'cropManagementRecommendations': an array of objects, each with 'recommendationId' (number), 'recommendation' (string), and 'severity' (string). "
    "3. 'visualisation': an object that contains keys for: "
    "   - 'temperatureTrend', "
    "   - 'rainfallTrend', "
    "   - 'soilMoistureLevel', and "
    "   - 'windSpeedTrend'. Each of these should be an object with a 'dataSource' (string) and 'data' (an array or object with timestamped entries). "
    "4. 'pestDetection': an object that contains: "
    "   - 'pestIncidence': an object with 'currentPestRatio' (numeric), 'threshold' (numeric), and 'dataSource' (string); "
    "   - 'detectionConfidence' (numeric), "
    "   - 'pestType' (string), and "
    "   - 'alerts': an array of objects, each with 'alertTime' (ISO timestamp) and 'severity' (string). "
    "Ensure that each key is populated with either real data or meaningful sample values if data is not available, so the entire JSON structure is fully filled out for the dashboard."
)

    # Prepare the request payload
    payload = {
        "model": "mistralai/Mixtral-8x7B-Instruct-v0.1",
        "messages": [
            {"role": "user", "content": refined_prompt}
        ]
    }

    # E2E Networks API details
    e2e_api_url = os.getenv('E2E_API_URL', 'https://api.e2enetworks.com/mistral')
    e2e_api_token = os.getenv('E2E_API_TOKEN', 'your-end-2-end-token')

    try:
        # Make a request to the E2E Networks API
        response = requests.post(
            e2e_api_url,
            headers={
                'Authorization': f'Bearer {e2e_api_token}',
                'Content-Type': 'application/json'
            },
            json=payload
        )

        if response.status_code == 200:
            try:
                raw_data = json.loads(response.text)  # Parse the response text into a JSON object
                content_str = raw_data.get("choices", [{}])[0].get("message", {}).get("content", "")
                clean_content = content_str.strip().replace('\n', '')
                
                # Validate and debug the JSON content
                try:
                    clean_content = clean_content.strip()
                    # Replace problematic characters and ensure valid JSON
                    clean_content = clean_content.replace('\n', '').replace('\t', '').replace('\\', '\\\\')
                    clean_content = clean_content.replace('\"', '"')  # Fix escaped quotes
                    extracted_data = json.loads(clean_content)
                except json.JSONDecodeError as e:
                    return jsonify({"error": "Invalid JSON format in response"}), 500

                # Example: Extract and format relevant data
                formatted_data = {
                    "weather": extracted_data.get("weather", {}),
                    "cropHealth": extracted_data.get("cropHealth", {}),
                    "visualisation": extracted_data.get("visualisation", {}),
                    "pestDetection": extracted_data.get("pestDetection", {})
                }
                return jsonify(formatted_data)
            except Exception as e:
                return jsonify({"error": "Failed to process response"}), 500

        return jsonify({"error": "Failed to fetch data from Mistral API"}), response.status_code

    except requests.exceptions.RequestException as e:
        return jsonify({"error": "Request to Mistral API failed"}), 500

    except Exception as e:
        return jsonify({"error": "An unexpected error occurred"}), 500

# Add a route to handle favicon.ico requests
@app.route('/favicon.ico')
def favicon():
    return '', 404  # Return a 404 for favicon.ico requests

if __name__ == '__main__':
    app.run(debug=True)