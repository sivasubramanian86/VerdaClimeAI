import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to VerdaClime AI",
      weather: "Weather Data",
      temperature: "Temperature",
      rainfall: "Rainfall",
      wind: "Wind",
      soilMoisture: "Soil Moisture",
      hailstorm: "Hailstorm",
      cropHealth: "Crop Health",
      pestDetection: "Pest Detection",
      realTimeVisualization: "Real-Time Visualization",
    },
  },
  hi: {
    translation: {
      welcome: "वर्दाक्लाइम एआई में आपका स्वागत है",
      weather: "मौसम डेटा",
      temperature: "तापमान",
      rainfall: "वर्षा",
      wind: "हवा",
      soilMoisture: "मिट्टी की नमी",
      hailstorm: "ओलावृष्टि",
      cropHealth: "फसल स्वास्थ्य",
      pestDetection: "कीट पहचान",
      realTimeVisualization: "रीयल-टाइम विज़ुअलाइज़ेशन",
    },
  },
  // Add more languages here
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem('language') || 'en', // Default language is fetched from localStorage
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

  // Add a listener to update the language dynamically
  i18n.on('languageChanged', (lng) => {
    localStorage.setItem('language', lng); // Save the selected language to localStorage
  });

export default i18n;