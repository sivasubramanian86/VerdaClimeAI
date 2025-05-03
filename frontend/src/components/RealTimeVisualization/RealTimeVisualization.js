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
  console.log(data)
  const { t } = useTranslation();
  
  if (!data || Object.keys(data).length === 0) {
    return (
      <Card style={{ margin: '20px', padding: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            {t('realTimeVisualization')}
          </Typography>
          <p>{t('noDataAvailable')}</p>
        </CardContent>
      </Card>
    );
  }

  // Prepare data for the bar chart from LLM output
  const llmCategories = Object.keys(data);
  const llmScores = Object.values(data);
  const chartData = {
    labels: llmCategories,
    datasets: [
      {
        label: 'LLM Analysis Scores',
        data: llmScores,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',

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