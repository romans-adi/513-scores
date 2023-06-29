import React, { useEffect, useState } from 'react';
import Ripples from 'react-ripples';
import { PropTypes } from 'prop-types';
import '../../views/Home.scss';
import './TournamentItem.scss';
import getLeagueItemBackgroundColor from '../../colorUtils';

const TournamentItem = ({ tournament, handleTournamentClick, index }) => {
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
    <div style={{ backgroundColor: getLeagueItemBackgroundColor(index) }}>
      <Ripples>
        <button
          className="tournament-item"
          type="button"
          onClick={() => handleTournamentClick(tournament.eventId)}
        >
          <div>
            {countryCode && (
              <span role="img" aria-label={`${name} Flag`} style={{ fontSize: '2rem' }}>
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
          </div>
        </button>
      </Ripples>
    </div>
  );
};

TournamentItem.propTypes = {
  index: PropTypes.number.isRequired,
  tournament: PropTypes.shape({
    name: PropTypes.string.isRequired,
    countryCode: PropTypes.string,
    eventId: PropTypes.number.isRequired,
    eventCount: PropTypes.number.isRequired,
  }).isRequired,
  handleTournamentClick: PropTypes.func.isRequired,
};

export default TournamentItem;
