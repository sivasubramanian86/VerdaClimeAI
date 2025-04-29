import React, { useState } from 'react';
import './Navbar.css';

function Navbar() {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    // Add logic to update the app's language dynamically
    console.log(`Language changed to: ${e.target.value}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">VerdaClime AI</div>
      <div className="navbar-menu">
        <select
          className="language-selector"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>
    </nav>
  );
}

export default Navbar;