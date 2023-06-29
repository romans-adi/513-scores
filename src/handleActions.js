/* eslint-disable max-len */
import countriesAbbreviations from './countries';
import {
  fetchSectionsData, fetchEventsByLeagueData, fetchEventsBySectionData, setTournamentList, setSelectedLeagueId,
} from './redux/categories/categoriesSlice';

export const handleCategoryClick = async (
  categoryId,
  dispatch,
  navigate,
) => {
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
      navigate('/tournament');
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
        dispatch(setSelectedLeagueId(league));
        navigate(`/league/${league.slug}`);
      } else {
        console.error('Error fetching events: Invalid league object or missing slug');
        const leagueId = league ? league.id : 'Unknown League';
        navigate(`/league/${leagueId}`);
      }
    } else {
      console.error('Error fetching events: No events found');
    }
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};

export const handleLeagueClick = async (leagueId, dispatch, setEventList, setSelectedLeague) => {
  try {
    const action = await dispatch(fetchEventsByLeagueData(leagueId));
    const events = action.payload;
    console.log(events);
    setEventList(events);
    setSelectedLeague(events[0]?.league);
  } catch (error) {
    console.error('Error fetching events:', error);
  }
};
