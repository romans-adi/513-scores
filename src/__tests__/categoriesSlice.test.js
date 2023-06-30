import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import categoriesReducer, {
  fetchCategoriesData,
  fetchSectionsData,
  fetchEventsBySectionData,
  fetchEventsByLeagueData,
} from '../redux/categories/categoriesSlice';
import * as api from '../redux/categories/api';

jest.mock('../redux/categories/api', () => ({
  fetchCategories: jest.fn(),
  fetchSectionsByCategory: jest.fn(),
  fetchEventsBySection: jest.fn(),
  fetchEventsByLeague: jest.fn(),
}));

describe('categories slice', () => {
  let store;
  let dispatchedActions; // Track dispatched actions here

  beforeEach(() => {
    store = configureStore({
      reducer: {
        categories: categoriesReducer,
      },
      middleware: [thunk],
    });

    dispatchedActions = []; // Initialize the dispatched actions array
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  // Helper function to track dispatched actions
  const trackDispatchedActions = (action) => {
    dispatchedActions.push(action);
  };

  test('should dispatch fetchCategoriesData and set categories on successful fetch', async () => {
    const mockCategories = ['Category 1', 'Category 2'];
    api.fetchCategories.mockResolvedValueOnce(mockCategories);

    await store.dispatch(fetchCategoriesData());
    const state = store.getState().categories;

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.categories).toEqual(mockCategories);
  });

  test('should dispatch fetchSectionsData and set sections on successful fetch', async () => {
    const mockSections = ['Section 1', 'Section 2'];
    const categoryId = 1;
    api.fetchSectionsByCategory.mockResolvedValueOnce(mockSections);

    await store.dispatch(fetchSectionsData(categoryId));
    const state = store.getState().categories;

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.sections).toEqual(mockSections);
  });

  test('should dispatch fetchEventsBySectionData and set events on successful fetch', async () => {
    const sectionId = 123;
    const mockEvents = [
      { id: 1, name: 'Event 1', league: 'League 1' },
      { id: 2, name: 'Event 2', league: 'League 1' },
    ];

    api.fetchEventsBySection.mockResolvedValueOnce(mockEvents);

    await store.dispatch(fetchEventsBySectionData(sectionId)).then(trackDispatchedActions); // Track dispatched actions

    // Find the pending and fulfilled actions in the dispatched actions array
    const pendingAction = dispatchedActions.find(
      (action) => action.type === fetchEventsBySectionData.pending.type
    );
    const fulfilledAction = dispatchedActions.find(
      (action) => action.type === fetchEventsBySectionData.fulfilled.type
    );

    expect(pendingAction).toBeDefined();
    expect(fulfilledAction).toBeDefined();
    expect(fulfilledAction.payload).toEqual(mockEvents);

    const state = store.getState().categories;
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.events).toEqual(mockEvents);
  });

  test('should dispatch fetchEventsByLeagueData and set events on successful fetch', async () => {
    const mockEvents = ['Event 1', 'Event 2'];
    const leagueId = 1;
    api.fetchEventsByLeague.mockResolvedValueOnce(mockEvents);

    await store.dispatch(fetchEventsByLeagueData(leagueId));
    const state = store.getState().categories;

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.events).toEqual(mockEvents);
  });
});
