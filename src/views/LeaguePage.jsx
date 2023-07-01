import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LeagueItem from '../components/Items/League/LeagueItem';
import { handleLeagueClick } from '../handleActions';

const LeaguePage = () => {
  const selectedLeague = useSelector((state) => state.categories.selectedLeague);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await handleLeagueClick(selectedLeague.id, dispatch);
      navigate('/events');
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <div className="league-container">
      {selectedLeague && (
        <LeagueItem
          key={selectedLeague.id}
          id={selectedLeague.id}
          logo={selectedLeague.logo}
          name={selectedLeague.name}
          handleClick={handleClick}
        />
      )}
    </div>
  );
};

export default LeaguePage;
