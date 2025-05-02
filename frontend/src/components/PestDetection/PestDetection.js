import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import './PestDetection.css';

function PestDetection({ data }) {
  if (!data) return <p>No pest detection data available.</p>;

  const { pestIncidence, detectionConfidence, pestType, alerts } = data;

  // Prepare data for the doughnut chart
  const chartData = {
    labels: ['Pest Incidence', 'Detection Confidence'],
    datasets: [
      {
        label: 'Pest Detection Metrics',
        data: [pestIncidence?.currentPestRatio || 0, detectionConfidence || 0],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
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
          Pest Detection Overview
        </Typography>
        <Doughnut data={chartData} />
        <Typography variant="body2" color="text.secondary">
          Pest Type: {pestType}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Alerts: {alerts?.length || 0}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default PestDetection;