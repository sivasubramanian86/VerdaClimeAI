import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import CropHealth from './components/CropHealth/CropHealth';
import RealTimeVisualization from './components/RealTimeVisualization/RealTimeVisualization';
import WeatherCard from './components/WeatherCard/WeatherCard';
import PestDetection from './components/PestDetection/PestDetection';
import './styles/App.css';

function App() {
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState('English');
  const [district, setDistrict] = useState('Ahmedabad'); // Default district
  const [cropType, setCropType] = useState('Rice'); // Default crop type

  const handleQueryChange = (e) => setQuery(e.target.value);
  const handleLanguageChange = (e) => setLanguage(e.target.value);
  const handleDistrictChange = (e) => setDistrict(e.target.value);
  const handleCropTypeChange = (e) => setCropType(e.target.value);

  const handleMicrophoneInput = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = language === 'Hindi' ? 'hi-IN' : 'en-IN'; // Add more language codes as needed
    recognition.onresult = (event) => {
      setQuery(event.results[0][0].transcript);
    };
    recognition.start();
  };

  const handleSubmit = () => {
    console.log({ query, language, district, cropType });
  };

  const [data, setData] = useState({
    weather: {},
    cropHealth: {},
    visualization: {},
    pestDetection: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('http://localhost:5000/api/mistral', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input: 'Fetch all data for the dashboard in Ahmedabad by gathering comprehensive, real-time and historical agricultural information. The response must be a valid, structured JSON object with clearly defined sections: include a \'weather\' key that contains detailed real-time metrics for temperature, rainfall, hailstorm alerts, soil moisture levels, and wind speed; include a \'cropHealth\' key holding current crop condition data, yield predictions, growth stage indicators, and recommendations for crop management; include a \'visualisation\' key with properly formatted data arrays or objects that can be rendered as charts or graphs (e.g., historical trends, current thresholds, or real-time updates) suitable for data visualization components; and include a \'pestDetection\' key that describes pest incidence data, detection confidence, occurrence rates, and any alerts for potential pest threats. Additionally, embed a \'recommendations\' section where the LLM can include high-level insights or actionable strategies based on the input data, ensuring that each section is clearly demarcated for ease of parsing in the backend. Make sure the response is structured in a way that each key\'s value is a self-contained object or array, so that the frontend components can directly consume the corresponding sections without further transformation',
            district,
            crop: cropType,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const result = await response.json();
        console.log('API Response:', result); // Debugging log

        setData({
          weather: result.weather || {},
          cropHealth: result.cropHealth || {},
          visualization: result.visualisation || {},
          pestDetection: result.pestDetection || {},
        });
      } catch (err) {
        console.error('Error fetching data:', err); // Debugging log
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [district, cropType]);

  return (
    <div className="App">
      <Navbar language={language} onLanguageChange={handleLanguageChange} />
      <header className="App-header">
        <h1>Welcome to VerdaClimeAI</h1>
      </header>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <div className="dashboard">
          <div className="dashboard-row">
            <WeatherCard data={data.weather} />
            <CropHealth data={data.cropHealth} />
          </div>
          <div className="dashboard-row">
            <RealTimeVisualization data={data.visualization} />
            <PestDetection data={data.pestDetection} />
          </div>
        </div>
      )}
      <div className="chat-box">
        <h2>Crop Query Chat</h2>
        <textarea
          placeholder="Type your crop query here..."
          className="chat-input"
          value={query}
          onChange={handleQueryChange}
        ></textarea>
        <div className="dropdowns">
          <select value={language} onChange={handleLanguageChange} className="dropdown">
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Bengali">Bengali</option>
            <option value="Marathi">Marathi</option>
            <option value="Gujarati">Gujarati</option>
            <option value="Punjabi">Punjabi</option>
            <option value="Kannada">Kannada</option>
            <option value="Malayalam">Malayalam</option>
            <option value="Odia">Odia</option>
            <option value="Assamese">Assamese</option>
            <option value="Urdu">Urdu</option>
            <option value="Sanskrit">Sanskrit</option>
            <option value="Konkani">Konkani</option>
            <option value="Maithili">Maithili</option>
            <option value="Dogri">Dogri</option>
            <option value="Santhali">Santhali</option>
            <option value="Bodo">Bodo</option>
            <option value="Kashmiri">Kashmiri</option>
          </select>
          <select value={district} onChange={handleDistrictChange} className="dropdown">
            <option value="">Select District</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Chennai">Chennai</option>
            <option value="Delhi">Delhi</option>
            <option value="Hyderabad">Hyderabad</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Patna">Patna</option>
            <option value="Bhopal">Bhopal</option>
            <option value="Indore">Indore</option>
          </select>
          <select value={cropType} onChange={handleCropTypeChange} className="dropdown">
            <option value="">Select Crop Type</option>
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
            <option value="Maize">Maize</option>
            <option value="Sugarcane">Sugarcane</option>
            <option value="Cotton">Cotton</option>
            <option value="Jute">Jute</option>
            <option value="Barley">Barley</option>
            <option value="Pulses">Pulses</option>
            <option value="Millets">Millets</option>
            <option value="Tea">Tea</option>
            <option value="Coffee">Coffee</option>
          </select>
        </div>
        <button className="chat-submit" onClick={handleSubmit}>Submit</button>
        <button className="chat-microphone" onClick={handleMicrophoneInput}>🎤</button>
      </div>
    </div>
  );
}

export default App;