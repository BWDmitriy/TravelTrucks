// src/pages/CatalogPage.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../features/campers/campersSlice';
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
    type: '',
    features: [],
  });

  useEffect(() => {
    dispatch(fetchCampers(filters));
  }, [dispatch, filters]);

  const handleSearch = () => {
    dispatch(fetchCampers(filters));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="catalog-page">
      <div className="catalog-sidebar">
        <div className="location">
          <div className="location-text">Location</div>
          <div className="location-detail">
            <svg className="icon">
              <use xlinkHref={`${sprite}#icon-map`}></use>
            </svg>
            Kyiv, Ukraine
          </div>
        </div>
        <div className="filters">
          <div className="filters-text">Filters</div>
          <h2>Vehicle equipment</h2>
          <div className="filter-buttons">
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref={`${sprite}#icon-wind`}></use>
              </svg>
              AC
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref={`${sprite}#icon-diagram`} ></use>
              </svg>
              Automatic
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref={`${sprite}#icon-cup-hot`} ></use>
              </svg>
              Kitchen
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref={`${sprite}#icon-tv`} ></use>
              </svg>
              TV
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref={`${sprite}#icon-ph_shower`} ></use>
              </svg>
              Bathroom
            </button>
          </div>
          <h2>Vehicle type</h2>
          <div className="filter-buttons">
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref={`${sprite}#icon-bi_grid-1x2`} ></use>
              </svg>
              Van
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref={`${sprite}#icon-bi_grid`} ></use>
              </svg>
              Fully Integrated
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref={`${sprite}#icon-bi_grid-3x3`} ></use>
              </svg>
              Alcove
            </button>
          </div>
        </div>
              
        <button className="search" onClick={handleSearch}>Search</button>
      </div>
      
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && campers && Array.isArray(campers) && (
        <ul className="camper-list">
          {campers.slice(0, visibleCount).map((camper) => (
            <li key={camper.id} className="camper-item">
              <div className="camper-photo">
                <img width="300px" src={camper.gallery[0].thumb} alt={camper.name} />
              </div>
              <div className="camper-details">
                <h2>{camper.name} - ${camper.price.toFixed(2)}</h2>
                {/* <p>Rating: {'★'.repeat(camper.rating)}{'☆'.repeat(5 - camper.rating)}</p> */}
                <p><svg className="icon">
                <use xlinkHref={`${sprite}#icon-star-pressed`} ></use>
                </svg> {camper.rating}({camper.reviews.length} Reviews) <svg className="icon">
              <use xlinkHref={`${sprite}#icon-map`}></use>
                  </svg>{camper.location}</p>
                
                <p>{camper.description}</p>
                <ul className="camper-features">
                  {camper.features && camper.features.slice(0, 3).map((feature, index) => (
                    <li key={index}>{feature}</li>
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