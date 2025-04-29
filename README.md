# VerdaClimeAI

VerdaClimeAI is a project designed to provide real-time visualization and analysis of climate and agricultural data. It consists of a backend for data processing and a frontend for user interaction.

## Project Structure

```
docker-compose.yml
README.md
backend/
    app.py
    Dockerfile
    k8s-backend.yaml
    model_utils.py
    preprocess_data.py
    requirements.txt
frontend/
    k8s-frontend.yaml
    package.json
    public/
        favicon.ico
        index.html
    src/
        App.js
        components/
            CropHealth/
            Navbar/
            RealTimeVisualization/
            WeatherCard/
```

## Prerequisites

- Docker
- Kubernetes (kubectl)
- Node.js and npm
- Python 3.10

## Setup Instructions

### Backend
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```bash
   python app.py
   ```

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install Node.js dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm start
   ```

## Deployment

### Using Docker Compose
1. Build and start the services:
   ```bash
   docker-compose up --build
   ```

### Using Kubernetes
1. Apply the Kubernetes configurations:
   ```bash
   kubectl apply -f backend/k8s-backend.yaml
   kubectl apply -f frontend/k8s-frontend.yaml
   ```

## Features
- Real-time visualization of climate data.
- Crop health monitoring.
- Weather updates.

## Contributing
Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License
This project is licensed under the MIT License.