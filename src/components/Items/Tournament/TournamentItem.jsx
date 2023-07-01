import React, { useEffect, useState } from 'react';
import Ripples from 'react-ripples';
import { PropTypes } from 'prop-types';
import './TournamentItem.scss';

const TournamentItem = ({ tournament, handleTournamentClick, backgroundColor }) => {
  const { name, countryCode } = tournament;
  const [eventCount, setEventCount] = useState(0);

  const getFlagEmoji = (countryCode) => {
    const codePoints = [...countryCode.toUpperCase()].map((x) => 0x1f1a5 + x.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  useEffect(() => {
    setEventCount(tournament.eventCount);
  }, [tournament]);

  return (
    <div className="tournament-item" style={{ backgroundColor }}>
      <Ripples>
        <button
          className="tournament-button"
          type="button"
          onClick={() => handleTournamentClick(tournament.eventId)}
        >
          {countryCode && (
          <span role="img" aria-label={`${name} Flag`} style={{ fontSize: '5rem' }}>
            {getFlagEmoji(countryCode)}
          </span>
          )}
          <span className="country-name">{name}</span>
          {eventCount > 0 && (
          <span className="event-count">
            (
            {eventCount}
            )
          </span>
          )}
        </button>
      </Ripples>
    </div>
  );
};

TournamentItem.propTypes = {
  tournament: PropTypes.shape({
    name: PropTypes.string.isRequired,
    countryCode: PropTypes.string,
    eventId: PropTypes.number.isRequired,
    eventCount: PropTypes.number,
  }).isRequired,
  handleTournamentClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
};

export default TournamentItem;
