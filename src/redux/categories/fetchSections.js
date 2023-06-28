const fetchSections = async (sportId) => {
  try {
    const response = await fetch(`https://sportscore1.p.rapidapi.com/sports/${sportId}/sections`, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'sportscore1.p.rapidapi.com',
        'x-rapidapi-key': '74774a281amsh81cee264c6afea5p19fb9djsn5dd3412499d5',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default fetchSections;
