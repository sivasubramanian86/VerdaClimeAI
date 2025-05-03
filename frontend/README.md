# VerdaClimeAI Frontend 🚀  

## Overview  
VerdaClimeAI is an AI-powered agricultural dashboard designed to assist extension workers in providing real-time insights to farmers. This frontend application includes **Weather, Crop Health, Real-Time Visualization, and Pest Detection** modules while integrating AI-powered recommendations and multilingual crop query support.  

## Features  
✅ **Weather Module:** Displays real-time temperature, rainfall trends, soil moisture, wind speed, and hailstorm alerts.  
✅ **Crop Health Module:** Provides crop condition insights, yield predictions, and tailored recommendations for rice and wheat.  
✅ **Real-Time Visualization:** Interactive graphs for trend analysis and distribution insights.  
✅ **Pest Detection Module:** AI-driven early pest warning system for proactive interventions.  
✅ **Multi-Lingual Crop Query Chat:** Enables extension officers to use voice input in native languages for AI-powered recommendations.  

## Tech Stack  
🔹 **Frontend:** React, Material-UI/Tailwind CSS, Recharts/Chart.js  
🔹 **State Management:** React Context API / Redux  
🔹 **API Integration:** Communicates with backend AI models (Mistral LLM)  
🔹 **Speech Recognition:** Google Speech-to-Text API for voice queries  

## Setup & Installation  
Ensure you have **Node.js** and **npm** installed before proceeding.  

1️⃣ **Clone the repository**  
```sh
git clone <YOUR_GITHUB_REPO_LINK>
cd frontend
```

2️⃣ **Install dependencies**  
```sh
npm install
```

3️⃣ **Run the development server**  
```sh
npm start
```
This will start the frontend locally at `http://localhost:3000`.

## Build & Deployment  
📌 **Production Build:**  
```sh
npm run build
```
This generates the production-ready build in the `/build` directory.  

📌 **Deploying on Cloud (Example: Vercel):**  
```sh
npm install -g vercel
vercel deploy
```

## Future Enhancements  
🔜 **Mobile App Development:** Expand to React Native or Flutter for seamless farmer accessibility.  
🔜 **Expanded Multi-Lingual Support:** AI-powered speech-to-text processing with dialect translation.  
🔜 **Enhanced AI Predictions:** Scaling models to include disease forecasting and hyper-local weather adaptability.  

## License  
This project is licensed under [MIT License](LICENSE).