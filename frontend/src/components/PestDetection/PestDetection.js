import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'; // Add this import

function PestDetection() {
  const { t } = useTranslation();
  const [pestData, setPestData] = useState([]);

  useEffect(() => {
    // Fetch pest detection data from the backend
    fetch('http://localhost:5000/api/pest-detection')
      .then((response) => response.json())
      .then((data) => {
        setPestData(data || []);
      })
      .catch((error) => console.error('Error fetching pest detection data:', error));
  }, []);

  return (
    <div className="pest-detection">
      <h2>{t('pestDetection')}</h2>
      {pestData.length > 0 ? (
        <ul>
          {pestData.map((pest, index) => (
            <li key={index}>
              {pest.name}: {pest.riskLevel}
            </li>
          ))}
        </ul>
      ) : (
        <p>{t('pestDetection')} data will be displayed here.</p>
      )}
    </div>
  );
}

export default PestDetection;