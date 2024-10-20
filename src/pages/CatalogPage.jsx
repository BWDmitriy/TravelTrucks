// src/pages/CatalogPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../features/campers/campersSlice';

function CatalogPage() {
  const dispatch = useDispatch();
  const campers = useSelector((state) => state.campers.list);
  const status = useSelector((state) => state.campers.status);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  return (
    <div>
      <h1>Catalog</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'succeeded' && (
        <ul>
          {campers.map((camper) => (
            <li key={camper.id}>
              {camper.name} - ${camper.price.toFixed(2)}
              <button>Show more</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CatalogPage;