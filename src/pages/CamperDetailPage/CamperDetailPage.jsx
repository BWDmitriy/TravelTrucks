// src/pages/CamperDetailPage.jsx
import PropTypes from 'prop-types';
import './CamperDetailPage.css';

function CamperDetailPage({ campers = [] }) { // Default to an empty array
  if (!Array.isArray(campers)) {
    console.error('Expected campers to be an array, but got:', campers);
    return null; // Render nothing if campers is not an array
  }

  return (
    <div className="camper-detail-page">
      {campers.map((camper) => (
        <div key={camper.id} className="camper-item">
          <img src={camper.image} alt={camper.name} className="camper-image" />
          <div className="camper-description">
            <div className="camper-header">
              <h2>{camper.name}</h2>
              <span className="camper-price">${camper.price.toFixed(2)}</span>
            </div>
            <div className="camper-rating-location">
              <div className="camper-rating">
                <svg className="icon">
                  <use xlinkHref="#icon-star-pressed"></use>
                </svg>
                {camper.rating} ({camper.reviews} reviews)
              </div>
              <div className="camper-location">
                <svg className="icon">
                  <use xlinkHref="#icon-map"></use>
                </svg>
                Kyiv, Ukraine
              </div>
            </div>
            <p className="camper-text">{camper.description}</p>
            <ul className="camper-features">
              {(camper.features || []).map((feature, index) => ( // Default to an empty array
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button className="show-more-button">Show More</button>
          </div>
        </div>
      ))}
    </div>
  );
}

CamperDetailPage.propTypes = {
  campers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      reviews: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      features: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

export default CamperDetailPage;