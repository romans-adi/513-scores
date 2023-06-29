import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  fetchSectionsByCategory,
  fetchEventsBySection,
  fetchEventsByLeague,
} from './api';

export const fetchCategoriesData = createAsyncThunk(
  'categories/fetchCategoriesData',
  async () => {
    const categories = await fetchCategories();
    return categories;
  },
);

export const fetchSectionsData = createAsyncThunk(
  'categories/fetchSectionsData',
  async (categoryId) => {
    const sections = await fetchSectionsByCategory(categoryId);
    return sections;
  },
);

export const fetchEventsBySectionData = createAsyncThunk(
  'categories/fetchEventsBySectionData',
  async (sectionId) => {
    const events = await fetchEventsBySection(sectionId);
    const league = events[0]?.league;
    const eventsWithLeague = events.map((event) => ({
      ...event,
      league,
    }));

    return eventsWithLeague;
  },
);

export const fetchEventsByLeagueData = createAsyncThunk(
  'categories/fetchEventsByLeagueData',
  async (leagueId) => {
    const events = await fetchEventsByLeague(leagueId);
    return events;
  },
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    tournaments: [],
    sections: [],
    events: [],
    isLoading: false,
    error: null,
    selectedLeague: null,
  },
  reducers: {
    setTournamentList: (state, action) => {
      state.tournaments = action.payload;
    },
    setSelectedLeagueId: (state, action) => {
      state.selectedLeague = action.payload;
    },
    setEventList: (state, action) => {
      state.events = action.payload;
    },
    setSelectedLeague: (state, action) => {
      state.selectedLeague = action.payload;
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
        state.categories = action.payload;
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
      })
      .addCase(fetchEventsBySectionData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEventsBySectionData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEventsBySectionData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchEventsByLeagueData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEventsByLeagueData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEventsByLeagueData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setTournamentList,
  setSelectedLeagueId,
  setEventList,
  setSelectedLeague,
} = categoriesSlice.actions;

export default categoriesSlice.reducer;