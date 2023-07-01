import { configureStore } from '@reduxjs/toolkit';
import categoriesSlice from './categories/categoriesSlice';

const store = configureStore({
  reducer: {
    categories: categoriesSlice,
  },
});

export default store;
