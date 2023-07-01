import countriesAbbreviations from './assets/countries';
import {
  fetchSectionsData, fetchEventsByLeagueData,
  fetchEventsBySectionData, setTournamentList, setSelectedLeague, setEventList,
} from './redux/categories/categoriesSlice';

export const handleCategoryClick = async (categoryId, dispatch, navigate) => {
  try {
    const response = await dispatch(fetchSectionsData(categoryId));
    const sections = response.payload;
    if (Array.isArray(sections)) {
      const tournaments = sections.map((section) => ({
        name: section.name,
        countryCode: countriesAbbreviations[section.name] || '',
        eventId: section.id,
        eventCount: 0,
      }));
      dispatch(setTournamentList(tournaments));
      navigate('/tournaments');
    } else {
      console.log('Error fetching sections: Invalid sections data');
    }
  } catch (error) {
    console.log('Error fetching sections:', error);
  }
};

export const handleTournamentClick = async (sportId, dispatch, navigate) => {
  try {
    const eventsAction = await dispatch(fetchEventsBySectionData(sportId));
    const events = eventsAction.payload;
    if (events.length > 0) {
      const { league } = events[0];
      if (league && league.slug) {
        dispatch(setSelectedLeague(league));
        navigate(`/${league.name}`);
      } else {
        console.error('Error fetching events: Invalid league object or missing slug');
        const leagueId = league ? league.id : 'No Active League';
        navigate(`/${leagueId}`);
      }
    } else {
      console.error('Error fetching events: No events found');
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

export const handleLeagueClick = async (leagueId, dispatch) => {
  try {
    const action = await dispatch(fetchEventsByLeagueData(leagueId));
    const events = action.payload || [];
    dispatch(setEventList(events));
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};
