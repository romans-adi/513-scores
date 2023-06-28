import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import fetchCategories from './fetchCategories';
import fetchSections from './fetchSections';

export const fetchCategoriesData = createAsyncThunk('categories/fetchCategoriesData', async () => {
  const categories = await fetchCategories();
  return categories.data;
});

export const fetchSectionsData = createAsyncThunk('categories/fetchSectionsData', async (categoryId) => {
  const response = await fetchSections(categoryId);
  return response.data;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    isLoading: false,
    error: null,
    fetchedCategories: false,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories = [...action.payload];
        state.fetchedCategories = true;
      })
      .addCase(fetchCategoriesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchSectionsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSectionsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.sections = action.payload;
      })
      .addCase(fetchSectionsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setCategories, setLoading, setError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
