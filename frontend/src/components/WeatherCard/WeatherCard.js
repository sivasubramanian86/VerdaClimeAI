import React from 'react';
import './WeatherCard.css';

function WeatherCard({ data }) {
  if (!data) return <p>No weather data available.</p>;

  const { temperature, rainfall, hailstormAlerts, soilMoisture, windSpeed } = data;

  return (
    <div className="weather-card">
      <h2>Weather Information</h2>
      <p>Temperature: {temperature?.currentValue} {temperature?.units} (Source: {temperature?.dataSource})</p>
      <p>Rainfall: {rainfall?.currentValue} {rainfall?.units}</p>
      <p>Hailstorm Alerts: {hailstormAlerts?.currentAlerts || 'None'}</p>
      <p>Soil Moisture: {soilMoisture?.currentLevel} {soilMoisture?.units}</p>
      <p>Wind Speed: {windSpeed?.currentValue} {windSpeed?.units}</p>
    </div>
  );
}

export default WeatherCard;