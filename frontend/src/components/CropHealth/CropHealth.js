import React, { useEffect, useState } from 'react';
import './CropHealth.css';

function CropHealth() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Fetch AI-generated crop health alerts from the backend
    fetch('http://localhost:5000/crop-health')
      .then((response) => response.json())
      .then((data) => setAlerts(data.alerts || []))
      .catch((error) => console.error('Error fetching crop health alerts:', error));
  }, []);

  return (
    <div className="crop-health">
      <h3>Crop Health Alerts</h3>
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      ) : (
        <p>No alerts at the moment.</p>
      )}
    </div>
  );
}

export default CropHealth;