import React, { useEffect, useState } from 'react';
import './WeatherCard.css';

function WeatherCard() {
  const [weatherData, setWeatherData] = useState({
    temperature: '--',
    rainfall: '--',
    wind: '--',
  });

  useEffect(() => {
    // Fetch real-time weather data from the backend
    fetch('http://localhost:5000/weather')
      .then((response) => response.json())
      .then((data) => {
        setWeatherData({
          temperature: data.temperature || '--',
          rainfall: data.rainfall || '--',
          wind: data.wind || '--',
        });
      })
      .catch((error) => console.error('Error fetching weather data:', error));
  }, []);

  return (
    <div className="weather-card">
      <h3>Weather Data</h3>
      <p>Temperature: {weatherData.temperature} °C</p>
      <p>Rainfall: {weatherData.rainfall} mm</p>
      <p>Wind: {weatherData.wind} km/h</p>
    </div>
  );
}

export default WeatherCard;