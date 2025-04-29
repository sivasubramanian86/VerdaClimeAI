from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/weather', methods=['GET'])
def get_weather():
    """Return dummy weather data."""
    return jsonify({
        'temperature': 25,
        'rainfall': 12,
        'wind': 15
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

if __name__ == '__main__':
    app.run(debug=True)