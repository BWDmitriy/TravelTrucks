// src/pages/HomePage.jsx
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-content">
        <h1>Campers of your dreams</h1>
        <h2>You can find everything you want in our catalog</h2>
        <button className="view-now-button" onClick={() => navigate('/catalog')}>View Now</button>
      </div>
    </div>
  );
}

export default HomePage;