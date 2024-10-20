// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import campersReducer from "./features/campers/campersSlice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
  },
});
