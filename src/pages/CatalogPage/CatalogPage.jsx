// src/pages/CatalogPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../redux/slice/campersSlice';
import { Link } from 'react-router-dom';
import './CatalogPage.css';
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
  // useDispatch(fetchCampers());
  useEffect(() => {
    dispatch(fetchCampers());
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
    <div className="catalog-page">
      <div className="catalog-sidebar">
        <div className="location">
          <div className="location-text">Location</div>
          <svg className="icon icon-location">
              <use xlinkHref={`${sprite}#icon-map`}></use>
            </svg>
          <input
          className="location-filter"
          type="text"
          name="location"
          placeholder="Kyiv, Ukraine"
          value={filters.location}
          onChange={handleFilterChange}
        />
        </div>
        <div className="filters">
          <div className="filters-text">Filters</div>
          <h2>Vehicle equipment</h2>
           <div className="filter-buttons">
          <button
            className={`${filters.features.includes('AC') ? 'active' : ''} filter-button`}
            onClick={() => toggleFeatureFilter('AC')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-wind`}></use>
              </svg>AC
            </button>
            <button
            className={`${filters.transmission === 'automatic' ? 'active' : ''} filter-button`}
            
            onClick={() => setTransmissionFilter('automatic')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-diagram`} ></use>
              </svg>Automatic
          </button>
          <button
            className={`${filters.features.includes('kitchen') ? 'active' : ''} filter-button`}
            onClick={() => toggleFeatureFilter('kitchen')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-cup-hot`} ></use>
              </svg>Kitchen
            </button>
            <button
            className={`${filters.features.includes('TV') ? 'active' : ''} filter-button`}
            onClick={() => toggleFeatureFilter('TV')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-tv`} ></use>
              </svg>TV
          </button>
          <button
            className={`feature-button ${filters.features.includes('bathroom') ? 'active' : ''} filter-button`}
            onClick={() => toggleFeatureFilter('bathroom')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-ph_shower`} ></use>
              </svg>Bathroom
            </button>
            <button
            className={`feature-button ${filters.features.includes('radio') ? 'active' : ''} filter-button`}
            onClick={() => toggleFeatureFilter('radio')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-ui-radios`} ></use>
              </svg>Radio
            </button>
            <button
            className={`feature-button ${filters.features.includes('refrigerator') ? 'active' : ''} filter-button`}
            onClick={() => toggleFeatureFilter('refrigerator')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-solar_fridge-outline`} ></use>
              </svg>Refrigerator
            </button>
            <button
            className={`feature-button ${filters.features.includes('gas') ? 'active' : ''} filter-button`}
            onClick={() => toggleFeatureFilter('gas')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-hugeicons_gas-stove`} ></use>
              </svg>Gas
            </button>
            <button
            className={`feature-button ${filters.features.includes('microwave') ? 'active' : ''} filter-button`}
            onClick={() => toggleFeatureFilter('microwave')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-lucide_microwave`} ></use>
              </svg>Microwave
            </button>
            <button
            className={`feature-button ${filters.features.includes('water') ? 'active' : ''} filter-button`}
            onClick={() => toggleFeatureFilter('water')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-ion_water-outline`} ></use>
              </svg>Water
          </button>
        </div>
          <h2>Vehicle type</h2>
          <div className="filter-buttons">
          <button
            className={`${filters.form === 'panelTruck' ? 'active' : ''} filter-button`}
            
            onClick={() => setTypeFilter('panelTruck')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-bi_grid-1x2`} ></use>
              </svg>Van
          </button>
          <button
            className={`${filters.form === 'fullyIntegrated' ? 'active' : ''} filter-button`}
            onClick={() => setTypeFilter('fullyIntegrated')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-bi_grid`} ></use>
              </svg>Fully Integrated
          </button>
          <button
            className={`${filters.form === 'alcove' ? 'active' : ''} filter-button`}
            onClick={() => setTypeFilter('alcove')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-bi_grid-3x3`} ></use>
              </svg>Alcove
          </button>
          </div>
          <h2>Engine type</h2>
          <div className="filter-buttons">
          <button
            className={`${filters.engine === 'diesel' ? 'active' : ''} filter-button`}
            
            onClick={() => setEngineFilter('diesel')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-fuel-pump`} ></use>
              </svg>Diesel
          </button>
          <button
            className={`${filters.engine === 'petrol' ? 'active' : ''} filter-button`}
            
            onClick={() => setEngineFilter('petrol')}
          >
            <svg className="icon">
                <use xlinkHref={`${sprite}#icon-fuel-pump`} ></use>
              </svg>Petrol
          </button>
          </div>
        </div>
              
        <button className="search" onClick={applyFilters}>Search</button>
      </div>
      
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && campers && Array.isArray(campers) && (
        <ul className="camper-list">
          {campers.slice(0, visibleCount).map((camper) => (
            <li key={camper.id} className="camper-item">
              <div
                className="camper-photo"
                style={{
                  backgroundImage: `url(${camper.gallery[0].thumb})`
                }}
              ></div>
              <div className="camper-details"><div>
                <div className="camper-details-header">
                  <h2>{camper.name}</h2><h2 className='camper-details-price'>€{`${camper.price.toFixed(2)} `}<svg className="icon">
                <use xlinkHref={`${sprite}#icon-heart-default`} ></use>
              </svg></h2>
                </div>
                
                <p className="camper-ratings"><svg className="icon">
                <use xlinkHref={`${sprite}#icon-star-pressed`} ></use>
                </svg> <span>{camper.rating}({camper.reviews.length} Reviews)</span> <svg className="icon">
              <use xlinkHref={`${sprite}#icon-map`}></use>
                  </svg>{camper.location}</p></div>
                
                <p className='single-line-ellipsis'>{camper.description}</p>
                <ul className="camper-features">
                  {getFeatureList(camper).map((feature, index) => (
                    <li className="camper-features-item" key={index}>
                      <svg className="icon">
                        <use xlinkHref={featureIcons[feature]}></use>
                      </svg> {feature}
                    </li>
                  ))}
                </ul>
                <Link to={`/catalog/${camper.id}`} className="show-more-button">
                  Show more
                </Link>
              </div>
            </li>
          ))}{campers && Array.isArray(campers) && visibleCount < campers.length && (
        <button className="load-more" onClick={() => setVisibleCount(visibleCount + 4)}>Load More</button>
      )}
        </ul>
      )}
      
    </div>
    
  );
}

export default CatalogPage;