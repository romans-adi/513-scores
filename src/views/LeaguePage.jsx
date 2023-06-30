import React, { useEffect } from 'react';
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
      dispatch(setEventList(events));
      navigate('/events');
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  useEffect(() => {
    if (selectedLeague) {
      dispatch(setSelectedLeague(selectedLeague));
    }
  }, [selectedLeague, dispatch]);

  const isFirstRender = useSelector((state) => state.categories.isFirstRender);
  const renderLogoOnly = !isFirstRender;

  return (
    <>
      <div className="selected-league-container">
        {selectedLeague && (
          <LeagueIcon
            key={selectedLeague.id}
            id={selectedLeague.id}
            logo={renderLogoOnly ? selectedLeague.logo : null}
            name={selectedLeague.name}
            handleClick={() => handleClick(selectedLeague.id)}
          />
        )}
      </div>
    </>
  );
};

export default LeaguePage;
