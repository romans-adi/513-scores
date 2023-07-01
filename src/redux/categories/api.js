import axios from 'axios';
import axiosRateLimit from 'axios-rate-limit';

const rateLimitedAxios = axiosRateLimit(axios.create(), { maxRequests: 1, perMilliseconds: 99000 });

const API_KEY = '220b7ab1afmsh133b9b9c2418ba6p1f9de3jsnd8fd181bf446';
const API_HOST = 'sportscore1.p.rapidapi.com';

export const fetchCategories = async () => {
  try {
    const options = {
      method: 'GET',
      url: `https://${API_HOST}/sports`,
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };

    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const fetchSectionsByCategory = async (categoryId) => {
  try {
    const options = {
      method: 'GET',
      url: `https://${API_HOST}/sports/${categoryId}/sections`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };

    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch sections');
  }
};

export const fetchEventsBySection = async (sectionId) => {
  try {
    const options = {
      method: 'GET',
      url: `https://${API_HOST}/sections/${sectionId}/events`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };

    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
};

export const fetchEventsByLeague = async (leagueId) => {
  try {
    const options = {
      method: 'GET',
      url: `https://${API_HOST}/leagues/${leagueId}/events`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };

    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    throw new Error('Failed to fetch events');
  }
};

export const fetchMetaBySport = async (categoryId) => {
  try {
    const options = {
      method: 'GET',
      url: `https://${API_HOST}/sports/${categoryId}/leagues`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };

    const response = await rateLimitedAxios.request(options);
    const { meta } = response.data;
    const totalEvents = meta;

    return totalEvents;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};

export const fetchMetaByTournament = async (categoryId) => {
  try {
    const options = {
      method: 'GET',
      url: `https://${API_HOST}/sports/${categoryId}/leagues`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };

    const response = await rateLimitedAxios.request(options);
    const { meta } = response.data;
    const totalEvents = meta;

    return totalEvents;
  } catch (error) {
    throw new Error('Failed to fetch categories');
  }
};
