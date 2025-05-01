import React from 'react';
import './CropHealth.css';

function CropHealth({ data }) {
  if (!data) return <p>No crop health data available.</p>;

  const { currentCropCondition, yieldPrediction, cropManagementRecommendations } = data;

  return (
    <div className="crop-health">
      <h2>Crop Health</h2>
      <p>Current Condition: {currentCropCondition}</p>
      <p>Yield Prediction: {yieldPrediction?.predictedValue} {yieldPrediction?.units} (Confidence: {yieldPrediction?.confidence}%)</p>
      <h3>Management Recommendations:</h3>
      <ul>
        {cropManagementRecommendations?.map((rec, index) => (
          <li key={index}>
            <strong>Recommendation:</strong> {rec.recommendation} <br />
            <strong>ID:</strong> {rec.recommendationId} <br />
            <strong>Severity:</strong> {rec.severity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CropHealth;