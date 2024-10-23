// src/pages/CatalogPage.jsx
import './CatalogPage.css';

function CatalogPage() {
  return (
    <div className="catalog-page">
      <div className="catalog-sidebar">
        <div className="location">
          <div className="location-text">Location</div>
          <div className="location-detail">
            <svg className="icon">
              <use xlinkHref="#icon-map"></use>
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
                <use xlinkHref="#icon-wind"></use>
              </svg>
              AC
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref="#icon-diagram"></use>
              </svg>
              Automatic
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref="#icon-cup-hot"></use>
              </svg>
              Kitchen
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref="#icon-tv"></use>
              </svg>
              TV
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref="#icon-ph_shower"></use>
              </svg>
              Bathroom
            </button>
          </div>
          <h2>Vehicle type</h2>
          <div className="filter-buttons">
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref="#icon-bi_grid-1x2"></use>
              </svg>
              Van
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref="#icon-bi_grid"></use>
              </svg>
              Fully Integrated
            </button>
            <button className="filter-button">
              <svg className="icon">
                <use xlinkHref="#icon-bi_grid-3x3"></use>
              </svg>
              Alcove
            </button>
          </div>
        </div>
      </div>
      <div className="catalog-list">
        {/* Camper items will be displayed here */}
      </div>
    </div>
  );
}

export default CatalogPage;