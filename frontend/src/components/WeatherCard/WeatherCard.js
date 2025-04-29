import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './WeatherCard.css';

function WeatherCard() {
  const { t } = useTranslation();

  const [weatherData, setWeatherData] = useState({
    temperature: '--',
    rainfall: '--',
    wind: '--',
    soilMoisture: '--',
    hailstorm: '--',
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
          soilMoisture: data.soilMoisture || '--',
          hailstorm: data.hailstorm || '--',
        });
      })
      .catch((error) => console.error('Error fetching weather data:', error));
  }, []);

  return (
    <div className="weather-card">
      <h3>{t('weather')}</h3>
      <p>{t('temperature')}: {weatherData.temperature} °C</p>
      <p>{t('rainfall')}: {weatherData.rainfall} mm</p>
      <p>{t('wind')}: {weatherData.wind} km/h</p>
      <p>{t('soilMoisture')}: {weatherData.soilMoisture} %</p>
      <p>{t('hailstorm')}: {weatherData.hailstorm}</p>
    </div>
  );
}

export default WeatherCard;