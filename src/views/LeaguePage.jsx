import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LeagueIcon from '../components/Items/LeagueIcon';
import {
  setSelectedLeagueId,
  fetchEventsByLeagueData,
  setEventList,
  setSelectedLeague,
} from '../redux/categories/categoriesSlice';

const LeaguePage = () => {
  const selectedLeague = useSelector((state) => state.categories.selectedLeague);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async (leagueId) => {
    dispatch(setSelectedLeagueId(leagueId));

    try {
      const events = await dispatch(fetchEventsByLeagueData(leagueId));
      console.log(events);
      dispatch(setEventList(events));
      setSelectedLeague(events[0]?.league);

      navigate('/events');
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  console.log('Selected League:', selectedLeague);

  return (
    <div>
      <div className="selected-league-container">
        {selectedLeague && (
          <LeagueIcon
            key={selectedLeague.id}
            id={selectedLeague.id}
            logo={selectedLeague.logo}
            name={selectedLeague.name}
            handleClick={() => handleClick(selectedLeague.id)}
          />
        )}
      </div>
    </div>
  );
};

export default LeaguePage;
