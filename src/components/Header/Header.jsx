// src/components/Header.jsx
import { NavLink } from 'react-router-dom';
import './Header.css';
import Logo from '../../assets/TravelTrucks.svg'; // Adjust the path if necessary

function Header() {
  return (
    <div className="header">
      <img src={Logo} alt="TravelTrucks Logo" className="header-logo" />
      <nav className="header-nav">
        <NavLink to="/" className="header-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/catalog" className="header-link" activeClassName="active">
          Catalog
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;