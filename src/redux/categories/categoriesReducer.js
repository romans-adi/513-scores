import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    fetchCategoriesRequest: (state) => ({
      ...state,
      isLoading: true,
      error: null,
    }),
    fetchCategoriesSuccess: (state, action) => ({
      ...state,
      isLoading: false,
      categories: action.payload,
    }),
    fetchCategoriesFailure: (state, action) => ({
      ...state,
      isLoading: false,
      error: action.payload,
    }),
  },
});

export const {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesFailure,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;
