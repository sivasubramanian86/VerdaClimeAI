import React from 'react';
import { Line } from 'react-chartjs-2';
import './RealTimeVisualization.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { useTranslation } from 'react-i18next';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function RealTimeVisualization({ data }) {
  const { t } = useTranslation();

  if (!data) return <p>{t('noVisualizationDataAvailable')}</p>;

  const { temperatureTrend, rainfallTrend, soilMoistureLevel, windSpeedTrend } = data;

  const chartData = {
    labels: Array.isArray(temperatureTrend?.data) ? temperatureTrend.data.map((entry) => new Date(entry.timestamp).toLocaleDateString()) : [],
    datasets: [
      {
        label: t('temperatureTrend'),
        data: Array.isArray(temperatureTrend?.data) ? temperatureTrend.data.map((entry) => entry.value) : [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  };

  return (
    <div className="real-time-visualization">
      <h2>{t('realTimeVisualization')}</h2>
      <h3>{t('temperatureTrend')}</h3>
      <p>{t('dataSource')}: {temperatureTrend?.dataSource}</p>
      {chartData.labels.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>{t('realTimeVisualization')} data will be displayed here.</p>
      )}
      <h3>{t('rainfallTrend')}</h3>
      <p>{t('dataSource')}: {rainfallTrend?.dataSource}</p>
      <h3>{t('soilMoistureLevel')}</h3>
      <p>{t('dataSource')}: {soilMoistureLevel?.dataSource}</p>
      <h3>{t('windSpeedTrend')}</h3>
      <p>{t('dataSource')}: {windSpeedTrend?.dataSource}</p>
    </div>
  );
}

export default RealTimeVisualization;