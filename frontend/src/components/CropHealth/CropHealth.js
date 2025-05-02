import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';
import './CropHealth.css';

function CropHealth({ data }) {
  if (!data) return <p>No crop health data available.</p>;

  const { currentCropCondition, yieldPrediction, cropManagementRecommendations } = data;

  // Prepare data for the pie chart
  const chartData = {
    labels: cropManagementRecommendations?.map((rec) => rec.recommendation) || [],
    datasets: [
      {
        label: 'Crop Management Recommendations',
        data: cropManagementRecommendations?.map((rec) => rec.severity === 'High' ? 3 : rec.severity === 'Moderate' ? 2 : 1) || [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card style={{ margin: '20px', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Crop Health Overview
        </Typography>
        <Pie data={chartData} />
        <Typography variant="body2" color="text.secondary">
          Current Condition: {currentCropCondition}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Yield Prediction: {yieldPrediction?.predictedValue} {yieldPrediction?.units} (Confidence: {yieldPrediction?.confidence}%)
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CropHealth;