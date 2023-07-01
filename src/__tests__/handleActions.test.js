import {
  handleCategoryClick,
  handleTournamentClick,
  handleLeagueClick,
} from '../handleActions';

import {
  fetchSectionsData,
  fetchEventsBySectionData,
  fetchEventsByLeagueData,
  setTournamentList,
  setSelectedLeague,
  setEventList,
} from '../redux/categories/categoriesSlice';

jest.mock('../redux/categories/categoriesSlice', () => ({
  fetchSectionsData: jest.fn(),
  fetchEventsBySectionData: jest.fn(),
  fetchEventsByLeagueData: jest.fn(),
  setTournamentList: jest.fn(),
  setSelectedLeague: jest.fn(),
  setEventList: jest.fn(),
}));

describe('handleCategoryClick', () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches sections data, sets tournament list, and navigates to "/tournaments" when sections are available', async () => {
    const categoryId = 1;
    const mockSections = [
      { id: 1, name: 'Section 1' },
      { id: 2, name: 'Section 2' },
    ];

    fetchSectionsData.mockResolvedValue({ payload: mockSections });

    await handleCategoryClick(categoryId, dispatchMock, navigateMock);

    expect(fetchSectionsData).toHaveBeenCalledWith(categoryId);
    expect(setTournamentList).toHaveBeenCalledWith([
      {
        name: 'Section 1', countryCode: '', eventId: 1, eventCount: 0,
      },
      {
        name: 'Section 2', countryCode: '', eventId: 2, eventCount: 0,
      },
    ]);
    expect(navigateMock).toHaveBeenCalledWith('/tournaments');
  });

  test('logs an error when sections data is invalid', async () => {
    const categoryId = 1;
    const mockSections = 'invalid';

    fetchSectionsData.mockResolvedValue({ payload: mockSections });

    await handleCategoryClick(categoryId, dispatchMock, navigateMock);

    expect(fetchSectionsData).toHaveBeenCalledWith(categoryId);
    expect(console.log).toHaveBeenCalledWith('Error fetching sections: Invalid sections data');
    expect(setTournamentList).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  test('logs an error when an error occurs while fetching sections data', async () => {
    const categoryId = 1;
    const mockError = new Error('Fetch error');

    fetchSectionsData.mockRejectedValue(mockError);

    await handleCategoryClick(categoryId, dispatchMock, navigateMock);

    expect(fetchSectionsData).toHaveBeenCalledWith(categoryId);
    expect(console.log).toHaveBeenCalledWith('Error fetching sections:', mockError);
    expect(setTournamentList).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});

describe('handleTournamentClick', () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches events by section data, sets selected league, and navigates to the league page when events are available', async () => {
    const sportId = 1;
    const mockEvents = [
      { league: { name: 'League 1', slug: 'league-1' } },
      { league: { name: 'League 2', slug: 'league-2' } },
    ];

    fetchEventsBySectionData.mockResolvedValue({ payload: mockEvents });

    await handleTournamentClick(sportId, dispatchMock, navigateMock);

    expect(fetchEventsBySectionData).toHaveBeenCalledWith(sportId);
    expect(setSelectedLeague).toHaveBeenCalledWith({ name: 'League 1', slug: 'league-1' });
    expect(navigateMock).toHaveBeenCalledWith('/League 1');
  });

  test('logs an error when events data is invalid', async () => {
    const sportId = 1;
    const mockEvents = 'invalid';

    fetchEventsBySectionData.mockResolvedValue({ payload: mockEvents });

    await handleTournamentClick(sportId, dispatchMock, navigateMock);

    expect(fetchEventsBySectionData).toHaveBeenCalledWith(sportId);
    expect(console.error).toHaveBeenCalledWith('Error fetching events: Invalid league object or missing slug');
    expect(navigateMock).toHaveBeenCalledWith('/No Active League');
  });

  test('logs an error when no events are found', async () => {
    const sportId = 1;
    const mockEvents = [];

    fetchEventsBySectionData.mockResolvedValue({ payload: mockEvents });

    await handleTournamentClick(sportId, dispatchMock, navigateMock);

    expect(fetchEventsBySectionData).toHaveBeenCalledWith(sportId);
    expect(console.error).toHaveBeenCalledWith('Error fetching events: No events found');
    expect(navigateMock).not.toHaveBeenCalled();
  });

  test('logs an error when an error occurs while fetching events data', async () => {
    const sportId = 1;
    const mockError = new Error('Fetch error');

    fetchEventsBySectionData.mockRejectedValue(mockError);

    await handleTournamentClick(sportId, dispatchMock, navigateMock);

    expect(fetchEventsBySectionData).toHaveBeenCalledWith(sportId);
    expect(console.error).toHaveBeenCalledWith('Error fetching events:', mockError);
    expect(navigateMock).not.toHaveBeenCalled();
  });
});

describe('handleLeagueClick', () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetches events by league data and sets event list', async () => {
    const leagueId = 1;
    const mockEvents = [
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' },
    ];

    fetchEventsByLeagueData.mockResolvedValue({ payload: mockEvents });

    await handleLeagueClick(leagueId, dispatchMock);

    expect(fetchEventsByLeagueData).toHaveBeenCalledWith(leagueId);
    expect(setEventList).toHaveBeenCalledWith(mockEvents);
  });

  test('logs an error when an error occurs while fetching events data', async () => {
    const leagueId = 1;
    const mockError = new Error('Fetch error');

    fetchEventsByLeagueData.mockRejectedValue(mockError);

    await handleLeagueClick(leagueId, dispatchMock);

    expect(fetchEventsByLeagueData).toHaveBeenCalledWith(leagueId);
    expect(console.error).toHaveBeenCalledWith('Error fetching events:', mockError);
    expect(setEventList).not.toHaveBeenCalled();
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
});
