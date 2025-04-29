import { useTranslation } from 'react-i18next';

function Navbar() {
  const { t, i18n } = useTranslation();

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;
    i18n.changeLanguage(selectedLanguage); // Change the language dynamically
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">{t('welcome')}</div>
      <div className="navbar-menu">
        <select className="language-selector" onChange={handleLanguageChange} defaultValue={i18n.language}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          {/* Add more language options here */}
        </select>
      </div>
    </nav>
  );
}

export default Navbar;