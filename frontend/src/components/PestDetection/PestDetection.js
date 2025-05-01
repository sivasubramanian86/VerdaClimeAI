import React from 'react';
import './PestDetection.css';

function PestDetection({ data }) {
  if (!data) return <p>No pest detection data available.</p>;

  const { pestIncidence } = data;

  return (
    <div className="pest-detection">
      <h2>Pest Detection</h2>
      <p>Pest Ratio: {pestIncidence?.currentPestRatio}</p>
      <p>Threshold: {pestIncidence?.threshold}</p>
      <p>Detection Confidence: {pestIncidence?.detectionConfidence || 'N/A'}%</p>
      <p>Pest Type: {pestIncidence?.pestType || 'Unknown'}</p>
      <h3>Alerts:</h3>
      <ul>
        {pestIncidence?.alerts?.map((alert, index) => (
          <li key={index}>{alert.alertTime} - Severity: {alert.severity}</li>
        ))}
      </ul>
    </div>
  );
}

export default PestDetection;