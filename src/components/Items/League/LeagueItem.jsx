import React from 'react';
import PropTypes from 'prop-types';
import './LeagueItem.scss';

const LeagueItem = ({
  logo, name, handleClick,
}) => (
  <button
    data-testid="league-item"
    type="button"
    className="league-item"
    onClick={handleClick}
  >
    <img className="league-logo" src={logo} alt={name} data-testid="league-logo" />
    <span className="league-name" data-testid="league-name">{name}</span>
  </button>
);

LeagueItem.propTypes = {
  name: PropTypes.string,
  logo: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

LeagueItem.defaultProps = {
  name: '',
  logo: null,
};

export default LeagueItem;
