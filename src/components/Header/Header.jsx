// src/components/Header.jsx
import { Link } from 'react-router-dom';
import './Header.css';
import Logo from '../assets/TravelTrucks.svg'; // Adjust the path if necessary

function Header() {
  return (
    <div className="header">
      <img src={Logo} alt="TravelTrucks Logo" className="header-logo" />
      <nav className="header-nav">
        <Link to="/" className="header-link">Home</Link>
        <Link to="/catalog" className="header-link">Catalog</Link>
      </nav>
    </div>
  );
}

export default Header;