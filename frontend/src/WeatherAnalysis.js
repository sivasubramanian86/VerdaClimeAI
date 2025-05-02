import React, { useState } from 'react';
import axios from 'axios';

function WeatherAnalysis() {
  // State for form inputs
  const [cropType, setCropType] = useState('Rice');
  const [region, setRegion] = useState('');

  // State for API response and error handling
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setWeatherData(null); // Reset weather data state
    setIsLoading(true); // Set loading to true before API call

    try {
      // Make API POST request
      const response = await axios.post('http://localhost:5000/weather', {
        cropType,
        region,
      });

      // Update state with API response
      const details = response.data.details || {};
      setWeatherData({
        weather: details.weather || 'No data available',
        soilMoisture: details.soilMoisture || 'No data available',
        rainPrediction: details.rainPrediction || 'No data available',
        crop_analysis: details.crop_analysis || 'No data available',
      });
    } catch (err) {
      console.error('Error fetching weather analysis:', err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setIsLoading(false); // Set loading to false after API call
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2>Weather Analysis</h2>

      {/* Form for user input */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="cropType">Crop Type:</label>
          <select
            id="cropType"
            value={cropType}
            onChange={(e) => setCropType(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px' }}
          >
            <option value="Rice">Rice</option>
            <option value="Wheat">Wheat</option>
          </select>
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="region">Region:</label>
          <input
            type="text"
            id="region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Enter district name"
            style={{ marginLeft: '10px', padding: '5px', width: '200px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          Get Weather Data
        </button>
      </form>

      {/* Display error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display weather data */}
      {isLoading ? (
        <p>Loading...</p>
      ) : weatherData && (
        <div style={{ marginTop: '20px' }}>
          <h3>Weather Data</h3>
          <div style={{ marginBottom: '10px' }}>
            <strong>Weather:</strong> {weatherData.weather}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Soil Moisture:</strong> {weatherData.soilMoisture}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Rain Prediction:</strong> {weatherData.rainPrediction}
          </div>
          <div style={{ marginBottom: '10px' }}>
            <strong>Crop Analysis:</strong> {weatherData.crop_analysis}
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherAnalysis;