import React from 'react';
import Ripples from 'react-ripples';
import { PropTypes } from 'prop-types';
import '../../views/Home.scss';
import getLeagueItemBackgroundColor from '../../colorUtils';

const TournamentItem = ({ tournament, handleTournamentClick }) => {
  const { name, countryCode } = tournament;

  const getFlagEmoji = (countryCode) => {
    const codePoints = [...countryCode.toUpperCase()].map((x) => 0x1f1a5 + x.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div style={{ backgroundColor: getLeagueItemBackgroundColor(tournament.eventId) }}>
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
            <span>{name}</span>
          </div>
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
  }).isRequired,
  handleTournamentClick: PropTypes.func.isRequired,
};

export default TournamentItem;
