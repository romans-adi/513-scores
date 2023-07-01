import mockAxios from '../__mocks__/axios';
import {
  fetchCategories,
  fetchSectionsByCategory,
  fetchEventsBySection,
  fetchEventsByLeague,
} from '../redux/categories/api';

const API_KEY = '5ab60f012emsh754dc2e9033832ap132597jsn7536973df8f1';
const API_HOST = 'sportscore1.p.rapidapi.com';

describe('API', () => {
  afterEach(() => {
    mockAxios.reset();
  });

  it('fetches categories successfully', async () => {
    const mockResponse = { data: 'mocked categories' };
    mockAxios.request.mockResolvedValueOnce(mockResponse);

    const result = fetchCategories();
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: `https://${API_HOST}/sports`,
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });
    await expect(result).resolves.toEqual(mockResponse.data.data);
  });

  it('throws an error when fetching categories fails', async () => {
    mockAxios.request.mockRejectedValueOnce(new Error('Failed to fetch categories'));

    const result = fetchCategories();
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: `https://${API_HOST}/sports`,
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });
    await expect(result).rejects.toThrow('Failed to fetch categories');
  });

  it('fetches sections by category successfully', async () => {
    const categoryId = '123';
    const mockResponse = { data: 'mocked sections' };
    mockAxios.request.mockResolvedValueOnce(mockResponse);

    const result = fetchSectionsByCategory(categoryId);
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: `https://${API_HOST}/sports/${categoryId}/sections`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });
    await expect(result).resolves.toEqual(mockResponse.data.data);
  });

  it('throws an error when fetching sections by category fails', async () => {
    const categoryId = '123';
    mockAxios.request.mockRejectedValueOnce(new Error('Failed to fetch sections'));

    const result = fetchSectionsByCategory(categoryId);
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: `https://${API_HOST}/sports/${categoryId}/sections`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });
    await expect(result).rejects.toThrow('Failed to fetch sections');
  });

  it('fetches events by section successfully', async () => {
    const sectionId = '456';
    const mockResponse = { data: 'mocked events' };
    mockAxios.request.mockResolvedValueOnce(mockResponse);

    const result = fetchEventsBySection(sectionId);
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: `https://${API_HOST}/sections/${sectionId}/events`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });
    await expect(result).resolves.toEqual(mockResponse.data.data);
  });

  it('throws an error when fetching events by section fails', async () => {
    const sectionId = '456';
    mockAxios.request.mockRejectedValueOnce(new Error('Failed to fetch events'));

    const result = fetchEventsBySection(sectionId);
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: `https://${API_HOST}/sections/${sectionId}/events`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });
    await expect(result).rejects.toThrow('Failed to fetch events');
  });

  it('fetches events by league successfully', async () => {
    const leagueId = '789';
    const mockResponse = { data: 'mocked events' };
    mockAxios.request.mockResolvedValueOnce(mockResponse);

    const result = fetchEventsByLeague(leagueId);
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: `https://${API_HOST}/leagues/${leagueId}/events`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });
    await expect(result).resolves.toEqual(mockResponse.data.data);
  });

  it('throws an error when fetching events by league fails', async () => {
    const leagueId = '789';
    mockAxios.request.mockRejectedValueOnce(new Error('Failed to fetch events'));

    const result = fetchEventsByLeague(leagueId);
    expect(mockAxios.request).toHaveBeenCalledWith({
      method: 'GET',
      url: `https://${API_HOST}/leagues/${leagueId}/events`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    });
    await expect(result).rejects.toThrow('Failed to fetch events');
  });
});
