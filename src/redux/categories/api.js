import axios from 'axios';

const API_KEY = 'efcf867780mshf46d4ddcf8ab52fp11b435jsn06efdd2dc21e';
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

export const fetchSectionEvents = async (sportId) => {
  try {
    const options = {
      method: 'GET',
      url: `https://${API_HOST}/sections/${sportId}/events`,
      params: { page: '1' },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    };
    const response = await axios.request(options);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
