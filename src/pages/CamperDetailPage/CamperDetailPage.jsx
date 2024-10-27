// src/pages/CamperDetailPage.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../features/campers/campersSlice';
import './CamperDetailPage.css';

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
      <h1>{camper.name}</h1>
      <p>Price: ${camper.price.toFixed(2)}</p>
      {/* Add more details and booking form here */}
    </div>
  );
}

export default CamperDetailPage;