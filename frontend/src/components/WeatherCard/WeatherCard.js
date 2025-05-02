import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './WeatherCard.css';

function WeatherCard({ data }) {
  if (!data) return <p>No weather data available.</p>;

  const { temperature, rainfall, windSpeed } = data;

  // Prepare data for the line chart
  const chartData = {
    labels: ['Temperature', 'Rainfall', 'Wind Speed'],
    datasets: [
      {
        label: 'Weather Metrics',
        data: [
          temperature?.currentValue || 0,
          rainfall?.currentValue || 0,
          windSpeed?.currentValue || 0,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card style={{ margin: '20px', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Weather Overview
        </Typography>
        <Line data={chartData} />
        <Typography variant="body2" color="text.secondary">
          Temperature: {temperature?.currentValue} {temperature?.units}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rainfall: {rainfall?.currentValue} {rainfall?.units}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Wind Speed: {windSpeed?.currentValue} {windSpeed?.units}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default WeatherCard;