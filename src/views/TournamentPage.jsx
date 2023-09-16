import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TournamentItem from '../components/Items/Tournament/TournamentItem';
import { handleTournamentClick } from '../handleActions';

const TournamentPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tournaments = useSelector((state) => state.categories.tournaments);

  useEffect(() => {
    if (!tournaments || tournaments.length === 0) {
      // Dispatch fetch tournaments
    }
  }, [dispatch, tournaments]);

  if (!tournaments || tournaments.length === 0) {
    return <div className="error-text">No tournaments available.</div>;
  }

  const handleItemClick = (eventId) => {
    handleTournamentClick(eventId, dispatch, navigate);
  };

  const sortedTournaments = tournaments.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="tournaments-container">
      {sortedTournaments.map((tournament) => (
        <TournamentItem
          key={tournament.eventId}
          tournament={tournament}
          handleTournamentClick={() => handleItemClick(tournament.eventId)}
        />
      ))}
    </div>
  );
};

export default TournamentPage;
