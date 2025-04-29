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

      setChartData((prevData) => ({
        labels: [...prevData.labels, newLabel].slice(-10),
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newData].slice(-10),
          },
        ],
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="real-time-visualization">
      <h2>Real-Time Crop Yield Prediction</h2>
      <Line data={chartData} />
    </div>
  );
}

export default RealTimeVisualization;