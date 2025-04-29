import React, { useState } from 'react';
import './components/Navbar/Navbar.css';
import './components/WeatherCard/WeatherCard.css';
import './components/CropHealth/CropHealth.css';
import './styles/App.css';
import Navbar from './components/Navbar/Navbar';
import WeatherCard from './components/WeatherCard/WeatherCard';
import CropHealth from './components/CropHealth/CropHealth';
import RealTimeVisualization from './components/RealTimeVisualization/RealTimeVisualization';

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="dashboard">
        <WeatherCard />
        <CropHealth />
        <RealTimeVisualization />
      </div>
    </div>
  );
}

export default App;