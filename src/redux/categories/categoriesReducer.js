import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  isLoading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default categoriesSlice.reducer;
