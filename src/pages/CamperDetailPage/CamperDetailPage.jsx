// src/pages/CamperDetailPage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/slice/campersSlice';
import styles from './CamperDetailPage.module.css';
import sprite from '../../assets/symbol-defs.svg'


function CamperDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.list.items);
  const camper = campers.find((c) => c.id === id);
  const [activeTab, setActiveTab] = useState('features');

  useEffect(() => {
    if (!camper) {
      dispatch(fetchCampers({
    location: '',
    form: '',
    engine: '',
    transmission: '',
    features: [],
  }));
    }
  }, [dispatch, camper]);

  if (!camper) {
    return <p>Loading...</p>;
  }
  const formDisplayNames = {
    alcove: 'Alcove',
    fullyIntegrated: 'Fully integrated',
    panelTruck: 'Panel truck',
  };

  const featureIcons = {
    AC: `${sprite}#icon-wind`,
    Bathroom: `${sprite}#icon-ph_shower`,
    Kitchen: `${sprite}#icon-cup-hot`,
    TV: `${sprite}#icon-tv`,
    Radio: `${sprite}#icon-ui-radios`,
    Refrigerator: `${sprite}#icon-solar_fridge-outline`,
    Microwave: `${sprite}#icon-lucide_microwave`,
    Gas: `${sprite}#icon-hugeicons_gas-stove`,
    Water: `${sprite}#icon-ion_water-outline`,
    'Automatic Transmission': `${sprite}#icon-diagram`,
    'Petrol Engine': `${sprite}#icon-fuel-pump`,
  };

  const getFeatureList = (camper) => {
    const features = [];
    const featureKeys = [
      'AC', 'bathroom', 'kitchen', 'TV', 'radio', 'refrigerator', 'microwave', 'gas', 'water'
    ];

    featureKeys.forEach((key) => {
      if (camper[key]) {
        features.push(key.charAt(0).toUpperCase() + key.slice(1));
      }
    });

    if (camper.transmission === 'automatic') {
      features.push('Automatic Transmission');
    }

    if (camper.engine === 'petrol') {
      features.push('Petrol Engine');
    }

    return features;
  };

  const renderFeatures = () => (
    <div>
     <ul className={styles.camperFeatures}>
        {getFeatureList(camper).map((feature, index) => (
          <li className={styles.camperFeaturesItem} key={index}>
            <svg className={styles.icon}>
              <use xlinkHref={featureIcons[feature]}></use>
            </svg> {feature}
          </li>
        ))}
      </ul>
      <h3>Vehicle Details</h3>
      <div className={styles.vehicleDetails}>
        <div>
          <p>Form
            </p>
          <p>{formDisplayNames[camper.form]}</p>
        </div>
        <div>
          <p>Length</p>
          <p>{camper.length}</p>
        </div>
        <div>
          <p>Width</p>
          <p>{camper.width}</p>
        </div>
        <div>
          <p>Height</p>
          <p>{camper.height}</p>
        </div>
        <div>
            
          <p>Tank</p>
          <p>{camper.tank}</p>
        </div>
        <div>
          <p>Consumption</p>
          <p>{camper.consumption}</p>
        </div>

      </div>
    </div>
  );

  const renderReviews = () => (
    <div className={styles.camperReviews}>
      {(camper.reviews || []).map((review, index) => (
         <div key={index} className={styles.review}>
          <div className={styles.reviewHeader}>
            <img src={`https://via.placeholder.com/50`} alt={review.reviewer_name} className={styles.reviewerPhoto} />
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
    <div className={styles.camperDetail}>
      <h2>{camper.name}</h2>
      <p className={styles.camperRatings}>
        <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-star-pressed`} ></use>
                </svg> {camper.rating}({camper.reviews.length} Reviews) <svg className={styles.icon}>
              <use xlinkHref={`${sprite}#icon-map`}></use>
                  </svg>{camper.location}</p>
      <h2 className={styles.camperDetailsPrice}>€{camper.price.toFixed(2)}</h2>
      
      
      <div className={styles.camperGallery}>
        {(camper.gallery || []).map((image, index) => (
          <div key={index}
                className={styles.camperPhoto}
                style={{
                  backgroundImage: `url(${image.original})`
                }}
              ></div>
        ))}
      </div>
            <p className={styles.camperDescription}>{camper.description}</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeTab === 'features' ? styles.active : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={`${styles.tab} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

       <div className={styles.contentAndForm}>
        <div className={styles.tabContent}>
          {activeTab === 'features' ? renderFeatures() : renderReviews()}
        </div>
         <div className={styles.bookingForm}>
          <h2>Book your campervan now</h2>
          <p>Stay connected! We are always ready to help you.</p>
          <form>
            <input type="text" placeholder="Name*" />
            <input type="email" placeholder="Email*" />
            <input type="date" placeholder="Booking date*" />
            <input type="text" placeholder="Comment*" className={styles.commentInput} />
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CamperDetailPage;