import axios from 'axios';

const fetchCategories = async () => {
  const options = {
    method: 'GET',
    url: 'https://sportscore1.p.rapidapi.com/sports',
    params: { all: 'true' },
    headers: {
      'X-RapidAPI-Key': '74774a281amsh81cee264c6afea5p19fb9djsn5dd3412499d5',
      'X-RapidAPI-Host': 'sportscore1.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    const categories = response.data;
    console.error(categories);
    return categories;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchCategories;
