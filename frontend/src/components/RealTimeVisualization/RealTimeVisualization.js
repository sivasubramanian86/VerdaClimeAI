import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import './RealTimeVisualization.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, Typography } from '@mui/material';
import 'chart.js/auto';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function RealTimeVisualization({ data }) {
  const { t } = useTranslation();

  if (!data) return <p>{t('noVisualizationDataAvailable')}</p>;

  const { temperatureTrend, rainfallTrend, soilMoistureLevel, windSpeedTrend } = data;

  // Prepare data for the bar chart
  const chartData = {
    labels: ['Temperature', 'Rainfall', 'Soil Moisture', 'Wind Speed'],
    datasets: [
      {
        label: 'Real-Time Trends',
        data: [
          temperatureTrend?.currentValue || 0,
          rainfallTrend?.currentValue || 0,
          soilMoistureLevel?.currentValue || 0,
          windSpeedTrend?.currentValue || 0,
        ],
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card style={{ margin: '20px', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {t('realTimeVisualization')}
        </Typography>
        <Bar data={chartData} />
      </CardContent>
    </Card>
  );
}

export default RealTimeVisualization;