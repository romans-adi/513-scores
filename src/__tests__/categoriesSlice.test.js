import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import categoriesReducer, {
  fetchCategoriesData,
  fetchSectionsData,
  fetchEventsBySectionData,
  fetchEventsByLeagueData,
  setTournamentList,
  setSelectedLeagueId,
  setEventList,
  setSelectedLeague,
} from '../redux/categories/categoriesSlice';
import * as api from '../redux/categories/api';

jest.mock('../redux/categories/api', () => ({
  fetchCategories: jest.fn(),
  fetchSectionsByCategory: jest.fn(),
  fetchEventsBySection: jest.fn(),
  fetchEventsByLeague: jest.fn(),
}));

const middlewares = [thunk];

describe('categories slice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        categories: categoriesReducer,
      },
      middleware: middlewares,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should dispatch fetchCategoriesData and update categories on successful fetch', async () => {
    const mockCategories = ['Category 1', 'Category 2'];
    api.fetchCategories.mockResolvedValueOnce(mockCategories);

    await store.dispatch(fetchCategoriesData());
    const state = store.getState().categories;

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.categories).toEqual(mockCategories);
  });

  test('should dispatch fetchSectionsData and update sections on successful fetch', async () => {
    const mockSections = ['Section 1', 'Section 2'];
    const categoryId = 1;
    api.fetchSectionsByCategory.mockResolvedValueOnce(mockSections);

    await store.dispatch(fetchSectionsData(categoryId));
    const state = store.getState().categories;

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.sections).toEqual(mockSections);
  });

  test('should dispatch fetchEventsBySectionData and update events on successful fetch', async () => {
    const sectionId = 123;
    const mockEvents = [
      { id: 1, name: 'Event 1', league: 'League 1' },
      { id: 2, name: 'Event 2', league: 'League 1' },
    ];
    api.fetchEventsBySection.mockResolvedValueOnce(mockEvents);

    await store.dispatch(fetchEventsBySectionData(sectionId));
    const state = store.getState().categories;

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.events).toEqual(mockEvents);
  });

  test('should dispatch fetchEventsByLeagueData and update events on successful fetch', async () => {
    const leagueId = 1;
    const mockEvents = ['Event 1', 'Event 2'];
    api.fetchEventsByLeague.mockResolvedValueOnce(mockEvents);

    await store.dispatch(fetchEventsByLeagueData(leagueId));
    const state = store.getState().categories;

    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.events).toEqual(mockEvents);
  });

  test('should update tournament list', () => {
    const mockTournaments = ['Tournament 1', 'Tournament 2'];
    store.dispatch(setTournamentList(mockTournaments));
    const state = store.getState().categories;

    expect(state.tournaments).toEqual(mockTournaments);
  });

  test('should set selected league ID', () => {
    const leagueId = 1;
    store.dispatch(setSelectedLeagueId(leagueId));
    const state = store.getState().categories;

    expect(state.selectedLeague).toBe(leagueId);
  });

  test('should update event list', () => {
    const mockEvents = ['Event 1', 'Event 2'];
    store.dispatch(setEventList(mockEvents));
    const state = store.getState().categories;

    expect(state.events).toEqual(mockEvents);
  });

  test('should set selected league', () => {
    const selectedLeague = 'League 1';
    store.dispatch(setSelectedLeague(selectedLeague));
    const state = store.getState().categories;

    expect(state.selectedLeague).toBe(selectedLeague);
  });
});
