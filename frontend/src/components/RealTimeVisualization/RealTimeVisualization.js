import React, { useState, useEffect } from 'react';
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

function RealTimeVisualization() {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Crop Yield Prediction',
        data: [],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
      },
    ],
  });

  useEffect(() => {
    // Simulate real-time data updates with dummy data
    const interval = setInterval(() => {
      const newLabel = new Date().toLocaleTimeString();
      const newData = Math.floor(Math.random() * 100); // Generate random data for testing

      setChartData((prevData) => {
        const updatedLabels = [...prevData.labels, newLabel].slice(-10);
        const updatedData = [...prevData.datasets[0].data, newData].slice(-10);

        // Ensure labels and data are valid arrays
        if (!Array.isArray(updatedLabels) || !Array.isArray(updatedData)) {
          console.error('Invalid chart data structure');
          return prevData;
        }

        return {
          labels: updatedLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: updatedData,
            },
          ],
        };
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="real-time-visualization">
      <h2>{t('realTimeVisualization')}</h2>
      {chartData.labels.length > 0 && chartData.datasets[0].data.length > 0 ? (
        <Line data={chartData} />
      ) : (
        <p>{t('realTimeVisualization')} data will be displayed here.</p>
      )}
    </div>
  );
}

export default RealTimeVisualization;