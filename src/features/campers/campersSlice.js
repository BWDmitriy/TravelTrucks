// src/features/campers/campersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const fetchCampers = createAsyncThunk('campers/fetchCampers', async (filters) => {
//   const response = await axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers', { params: filters });
//   return response.data.items;
// });

export const fetchCampers = createAsyncThunk('campers/fetchCampers', async (filters) => {
  const { location, form, engine, features } = filters;
  
  // Construct query parameters
  const params = {
    location: location || undefined,
    form: form || undefined,
    engine: engine || undefined,
  };

  // Add each feature as a separate query parameter
  features.forEach((feature) => {
    params[feature] = true;
  });

  const response = await axios.get('https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers', { params });
  return response.data.items; // Adjust based on the actual response structure
});

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    list: { items: [] },
    favorites: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list.items = action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addToFavorites, removeFromFavorites } = campersSlice.actions;

export default campersSlice.reducer;