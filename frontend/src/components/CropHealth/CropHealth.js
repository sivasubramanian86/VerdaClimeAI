import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Add this import

function CropHealth() {
  const { t } = useTranslation();
  const [cropHealthData, setCropHealthData] = useState([]);

  useEffect(() => {
    // Fetch crop health data from the backend
    fetch('http://localhost:5000/crop-health')
      .then((response) => response.json())
      .then((data) => {
        setCropHealthData(data.alerts || []);
      })
      .catch((error) => console.error('Error fetching crop health data:', error));
  }, []);

  return (
    <div className="crop-health">
      <h2>{t('cropHealth')}</h2>
      {cropHealthData.length > 0 ? (
        <ul>
          {cropHealthData.map((alert, index) => (
            <li key={index}>{alert}</li>
          ))}
        </ul>
      ) : (
        <p>{t('cropHealth')} data will be displayed here.</p>
      )}
    </div>
  );
}

export default CropHealth;