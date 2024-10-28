// src/pages/CamperDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../features/campers/campersSlice';
import './CamperDetailPage.css';
import sprite from '../../assets/symbol-defs.svg'


function CamperDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.list.items);
  const camper = campers.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    if (!camper) {
      dispatch(fetchCampers());
    }
  }, [dispatch, camper]);

  if (!camper) {
    return <p>Loading...</p>;
  }

  const renderFeatures = () => (
    <div>
      <ul className="camper-features">
        {(camper.features || []).map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <h3>Vehicle Details</h3>
      <table className="vehicle-details">
        <tbody>
          <tr>
            <td>Form</td>
            <td>{camper.form}</td>
          </tr>
          <tr>
            <td>Length</td>
            <td>{camper.length}</td>
          </tr>
          <tr>
            <td>Width</td>
            <td>{camper.width}</td>
          </tr>
          <tr>
            <td>Height</td>
            <td>{camper.height}</td>
          </tr>
          <tr>
            <td>Tank</td>
            <td>{camper.tank}</td>
          </tr>
          <tr>
            <td>Consumption</td>
            <td>{camper.consumption}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  const renderReviews = () => (
    <div className="camper-reviews">
      {(camper.reviews || []).map((review, index) => (
        <div key={index} className="review">
          <div className="review-header">
            <img src={`https://via.placeholder.com/50`} alt={review.reviewer_name} className="reviewer-photo" />
            <div>
              <p>{review.reviewer_name}</p>
              <p>{'★'.repeat(review.reviewer_rating)}{'☆'.repeat(5 - review.reviewer_rating)}</p>
            </div>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="camper-detail">
      <h2>{camper.name}</h2><p><svg className="icon">
                <use xlinkHref={`${sprite}#icon-star-pressed`} ></use>
                </svg> {camper.rating}({camper.reviews.length} Reviews) <svg className="icon">
              <use xlinkHref={`${sprite}#icon-map`}></use>
                  </svg>{camper.location}</p>
      <h2>Є{camper.price.toFixed(2)}</h2>
      

      <ul className="camper-features">
        {(camper.features || []).map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <div className="camper-gallery">
        {(camper.gallery || []).map((image, index) => (
          <img key={index} src={image.original} alt={`Gallery ${index + 1}`} className="gallery-image" />
        ))}
      </div>
            <p>{camper.description}</p>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'features' ? 'active' : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={`tab ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className="content-and-form">
        <div className="tab-content">
          {activeTab === 'features' ? renderFeatures() : renderReviews()}
        </div>
        <div className="booking-form">
          <h2>Book your campervan now</h2>
          <p>Stay connected! We are always ready to help you.</p>
          <form>
            <input type="text" placeholder="Name*" />
            <input type="email" placeholder="Email*" />
            <input type="date" placeholder="Booking date*" />
            <input type="text" placeholder="Comment*" className="comment-input" />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CamperDetailPage;