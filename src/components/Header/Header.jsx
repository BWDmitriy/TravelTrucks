// src/components/Header/Header.jsx
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import Logo from '../../assets/TravelTrucks.svg';

function Header() {
  return (
    <div className={styles.header}>
      <img src={Logo} alt="TravelTrucks Logo" className={styles.headerLogo} />
      <nav className={styles.headerNav}>
        <NavLink
          to="/"
          className={({ isActive }) => `${styles.headerLink} ${isActive ? styles.active : ''}`}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => `${styles.headerLink} ${isActive ? styles.active : ''}`}
        >
          Catalog
        </NavLink>
      </nav>
    </div>
  );
}

export default Header;