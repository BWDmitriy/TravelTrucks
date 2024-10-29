// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./slice/campersSlice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
});
