// src/pages/CatalogPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../features/campers/campersSlice';
import { Link } from 'react-router-dom';
import './CatalogPage.css';
import sprite from '../../assets/symbol-defs.svg'

function CatalogPage() {
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.list.items);
  const status = useSelector((state) => state.campers.status);
  
  useEffect(() => {
    fetchCampers();
  }, [dispatch]);

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
              
        <button className="search" onClick={fetchCampers}>Search</button>
      </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ul>
          {campers.slice(0, 4).map((camper) => (
            <li key={camper.id}>
              {camper.name} - ${camper.price.toFixed(2)}
              <Link to={`/catalog/${camper.id}`} className="show-more-button">
                Show more
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CatalogPage;