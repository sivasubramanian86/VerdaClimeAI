# VerdaClimeAI Backend

The backend of VerdaClimeAI is responsible for processing data, interacting with machine learning models, and serving APIs to the frontend. It is built using Python and Flask and is designed to handle real-time agricultural and climate data.

## Features
- Provides APIs for weather data, crop health, pest detection, and advisory.
- Interacts with external APIs and machine learning models for data processing.
- Supports deployment as a serverless function on Vercel.

## Project Structure
```
backend/
    app.py                  # Main Flask application
    data_ingestion_pipeline.py # ETL pipeline for data ingestion
    preprocess_data.py      # Script for preprocessing datasets
    model_utils.py          # Utilities for interacting with ML models
    requirements.txt        # Python dependencies
    vercel.json             # Configuration for Vercel deployment
```

## Prerequisites
- Python 3.9 or higher
- pip (Python package manager)

## Setup Instructions

### 1. Install Dependencies
Navigate to the `backend` directory and install the required Python packages:
```bash
cd backend
pip install -r requirements.txt
```

### 2. Run the Application Locally
Start the Flask development server:
```bash
python app.py
```
The backend will be available at `http://localhost:5000`.

### 3. Environment Variables
Create a `.env` file in the `backend` directory to configure environment variables:
```
E2E_API_URL=<your-e2e-api-url>
E2E_API_TOKEN=<your-e2e-api-token>
LLM_API_KEY=<your-llm-api-key>
BASE_URL=http://localhost:5000
```

### 4. Deploy to Vercel
To deploy the backend as a serverless function on Vercel:
1. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
2. Navigate to the `backend` directory and run:
   ```bash
   vercel
   ```
3. Follow the prompts to complete the deployment.

## API Endpoints

### `/weather` (GET)
Fetches weather data for crop management.

### `/crop-health` (GET)
Provides crop health alerts and recommendations.

### `/api/pest-detection` (GET)
Returns pest detection data and alerts.

### `/api/llm` (POST)
Interacts with the LLM model using user input.

### `/api/mistral` (POST)
Generates structured JSON data for the dashboard.

## License
This project is licensed under the MIT License. See the LICENSE file for details.