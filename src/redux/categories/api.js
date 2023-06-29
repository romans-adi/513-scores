import axios from 'axios';

const API_KEY = 'ad83f4013emshe90db1c06834cd6p126db6jsn8e559041807b';
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
