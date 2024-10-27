// src/pages/CamperDetailPage.jsx
import { useEffect } from 'react';
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

  useEffect(() => {
    if (!camper) {
      dispatch(fetchCampers());
    }
  }, [dispatch, camper]);

  if (!camper) {
    return <p>Loading...</p>;
  }

  return (
    <div className="camper-detail">
      <h1>{camper.name}</h1><p><svg className="icon">
                <use xlinkHref={`${sprite}#icon-star-pressed`} ></use>
                </svg> {camper.rating}({camper.reviews.length} Reviews) <svg className="icon">
              <use xlinkHref={`${sprite}#icon-map`}></use>
                  </svg>{camper.location}</p>
      <p>Price: Є{camper.price.toFixed(2)}</p>
      

      <ul className="camper-features">
        {(camper.features || []).map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <div className="camper-gallery">
        {(camper.gallery || []).map((image, index) => (
          <img key={index} src={image.thumb} alt={`Gallery ${index + 1}`} className="gallery-image" />
        ))}
      </div>
            <p>{camper.description}</p>
    </div>
  );
}

export default CamperDetailPage;