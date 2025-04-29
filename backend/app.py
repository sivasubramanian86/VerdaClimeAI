from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for the Flask app
CORS(app)

@app.route('/weather', methods=['GET'])
def get_weather():
    """Return dummy weather data."""
    return jsonify({
        'temperature': 25,
        'rainfall': 12,
        'wind': 15,
        'soilMoisture': 45,  # Added soil moisture data
        'hailstorm': 'No hailstorm expected'  # Added hailstorm condition
    })

@app.route('/crop-health', methods=['GET'])
def get_crop_health():
    """Return dummy crop health alerts."""
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
    # Example pest detection data
    pest_data = [
        {"name": "Aphids", "riskLevel": "High"},
        {"name": "Whiteflies", "riskLevel": "Moderate"},
        {"name": "Spider Mites", "riskLevel": "Low"}
    ]
    return jsonify(pest_data)

if __name__ == '__main__':
    app.run(debug=True)