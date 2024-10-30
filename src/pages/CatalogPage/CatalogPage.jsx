// src/pages/CatalogPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/slice/campersSlice';
import { Link } from 'react-router-dom';
import styles from './CatalogPage.module.css';
import sprite from '../../assets/symbol-defs.svg'

function CatalogPage() {
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.list.items);
  const status = useSelector((state) => state.campers.status);
  const [visibleCount, setVisibleCount] = useState(4);
  const [filters, setFilters] = useState({
    location: '',
    form: '',
    engine: '',
    transmission: '',
    features: [],
  });
  useEffect(() => {
    dispatch(fetchCampers({
    location: '',
    form: '',
    engine: '',
    transmission: '',
    features: [],
  })); 
  }, [dispatch]);


  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const setTypeFilter = (form) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      form: prevFilters.form === form ? '' : form, 
    }));
  };

  const setEngineFilter = (engine) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      engine: prevFilters.engine === engine ? '' : engine, 
    }));
  };
  const setTransmissionFilter = (transmission) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      transmission: prevFilters.transmission === transmission ? '' : transmission, 
    }));
  };


  const toggleFeatureFilter = (feature) => {
    setFilters((prevFilters) => {
      const features = prevFilters.features.includes(feature)
        ? prevFilters.features.filter((f) => f !== feature)
        : [...prevFilters.features, feature];
      return { ...prevFilters, features };
    });
  };

  const applyFilters = () => {
    dispatch(fetchCampers(filters));
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

  return (
    <div className={styles.catalogPage}>
      <div className={styles.catalogSidebar}>
        <div className={styles.location}>
          <div className={styles.locationText}>Location</div>
          <svg className={`${styles.icon} ${styles.iconLocation}`}>
            <use xlinkHref={`${sprite}#icon-map`}></use>
          </svg>
          <input
            className={styles.locationFilter}
            type="text"
            name="location"
            placeholder="Kyiv, Ukraine"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>
        <div className={styles.filters}>
          <div className={styles.filtersText}>Filters</div>
          <h2>Vehicle equipment</h2>
           <div className={styles.filterButtons}>
          <button
            className={`${filters.features.includes('AC') ? styles.active : ''} ${styles.filterButton}`}
            onClick={() => toggleFeatureFilter('AC')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-wind`}></use>
              </svg>AC
            </button>
            <button
            className={`${filters.transmission === 'automatic' ? styles.active : ''} ${styles.filterButton}`}
            
            onClick={() => setTransmissionFilter('automatic')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-diagram`} ></use>
              </svg>Automatic
          </button>
          <button
            className={`${filters.features.includes('kitchen') ? styles.active : ''} ${styles.filterButton}`}
            onClick={() => toggleFeatureFilter('kitchen')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-cup-hot`} ></use>
              </svg>Kitchen
            </button>
            <button
            className={`${filters.features.includes('TV') ? styles.active : ''} ${styles.filterButton}`}
            onClick={() => toggleFeatureFilter('TV')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-tv`} ></use>
              </svg>TV
          </button>
          <button
            className={`feature-button ${filters.features.includes('bathroom') ? styles.active : ''} ${styles.filterButton}`}
            onClick={() => toggleFeatureFilter('bathroom')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-ph_shower`} ></use>
              </svg>Bathroom
            </button>
            <button
            className={`feature-button ${filters.features.includes('radio') ? styles.active : ''} ${styles.filterButton}`}
            onClick={() => toggleFeatureFilter('radio')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-ui-radios`} ></use>
              </svg>Radio
            </button>
            <button
            className={`feature-button ${filters.features.includes('refrigerator') ? styles.active : ''} ${styles.filterButton}`}
            onClick={() => toggleFeatureFilter('refrigerator')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-solar_fridge-outline`} ></use>
              </svg>Refrigerator
            </button>
            <button
            className={`feature-button ${filters.features.includes('gas') ? styles.active : ''} ${styles.filterButton}`}
            onClick={() => toggleFeatureFilter('gas')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-hugeicons_gas-stove`} ></use>
              </svg>Gas
            </button>
            <button
            className={`feature-button ${filters.features.includes('microwave') ? styles.active : ''} ${styles.filterButton}`}
            onClick={() => toggleFeatureFilter('microwave')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-lucide_microwave`} ></use>
              </svg>Microwave
            </button>
            <button
            className={`feature-button ${filters.features.includes('water') ? styles.active : ''} ${styles.filterButton}`}
            onClick={() => toggleFeatureFilter('water')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-ion_water-outline`} ></use>
              </svg>Water
          </button>
        </div>
          <h2>Vehicle type</h2>
          <div className={styles.filterButtons}>
          <button
            className={`${filters.form === 'panelTruck' ? styles.active : ''} ${styles.filterButton}`}
            
            onClick={() => setTypeFilter('panelTruck')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-bi_grid-1x2`} ></use>
              </svg>Van
          </button>
          <button
            className={`${filters.form === 'fullyIntegrated' ? styles.active : ''} ${styles.filterButton}`}
            onClick={() => setTypeFilter('fullyIntegrated')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-bi_grid`} ></use>
              </svg>Fully Integrated
          </button>
          <button
            className={`${filters.form === 'alcove' ? styles.active : ''} ${styles.filterButton}`}
            onClick={() => setTypeFilter('alcove')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-bi_grid-3x3`} ></use>
              </svg>Alcove
          </button>
          </div>
          <h2>Engine type</h2>
          <div className={styles.filterButtons}>
          <button
            className={`${filters.engine === 'diesel' ? styles.active : ''} ${styles.filterButton}`}
            
            onClick={() => setEngineFilter('diesel')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-fuel-pump`} ></use>
              </svg>Diesel
          </button>
          <button
            className={`${filters.engine === 'petrol' ? styles.active : ''} ${styles.filterButton}`}
            
            onClick={() => setEngineFilter('petrol')}
          >
            <svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-fuel-pump`} ></use>
              </svg>Petrol
          </button>
          </div>
        </div>
              
        <button className="search" onClick={applyFilters}>Search</button>
      </div>
      
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && campers && Array.isArray(campers) && (
        <ul className={styles.camperList}>
          {campers.slice(0, visibleCount).map((camper) => (
            <li key={camper.id} className={styles.camperItem}>
              <div
                className={styles.camperPhoto}
                style={{
                  backgroundImage: `url(${camper.gallery[0].thumb})`
                }}
              ></div>
              <div className={styles.camperDetails}><div>
                <div className={styles.camperDetailsHeader}>
                  <h2>{camper.name}</h2><h2 className={styles.camperDetailsPrice}>€{`${camper.price.toFixed(2)} `}<svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-heart-default`} ></use>
              </svg></h2>
                </div>
                
                <p className={styles.camperRatings}><svg className={styles.icon}>
                <use xlinkHref={`${sprite}#icon-star-pressed`} ></use>
                </svg> <span>{camper.rating}({camper.reviews.length} Reviews)</span> <svg className={styles.icon}>
              <use xlinkHref={`${sprite}#icon-map`}></use>
                  </svg>{camper.location}</p></div>
                
                <p className={styles.singleLineEllipsis}>{camper.description}</p>
                <ul className={styles.camperFeatures}>
                  {getFeatureList(camper).map((feature, index) => (
                    <li className={styles.camperFeaturesItem} key={index}>
                      <svg className={styles.icon}>
                        <use xlinkHref={featureIcons[feature]}></use>
                      </svg> {feature}
                    </li>
                  ))}
                </ul>
                <Link to={`/catalog/${camper.id}`} className={styles.showMoreButton}>
                  Show more
                </Link>
              </div>
            </li>
          ))}{campers && Array.isArray(campers) && visibleCount < campers.length && (
        <button className={styles.loadMore} onClick={() => setVisibleCount(visibleCount + 4)}>Load More</button>
      )}
        </ul>
      )}
      
    </div>
    
  );
}

export default CatalogPage;