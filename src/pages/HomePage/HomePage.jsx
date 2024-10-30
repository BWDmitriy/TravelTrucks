// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className={styles.homePage}>
      <div className={styles.homeContent}>
        <h1>Welcome to TravelTrucks</h1>
        <h2>Your adventure starts here</h2>
        <button className={styles.viewNowButton} onClick={() => navigate('/catalog')}>View Now</button>
      </div>
    </div>
  );
}

export default HomePage;