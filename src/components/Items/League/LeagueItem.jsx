import React from 'react';
import PropTypes from 'prop-types';
import './LeagueItem.scss';
import getLeagueItemBackgroundColor from '../../../assets/colorUtils';

const LeagueItem = ({
  logo, name, handleClick, id,
}) => (
  <button
    data-testid="league-item"
    type="button"
    className="league-item"
    onClick={handleClick}
    style={{ backgroundColor: getLeagueItemBackgroundColor(id) }}
  >
    <img className="league-logo" src={logo} alt={name} data-testid="league-logo" />
    <span className="league-name" data-testid="league-name">{name}</span>
  </button>
);

LeagueItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  logo: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

LeagueItem.defaultProps = {
  name: '',
  id: null,
  logo: null,
};

export default LeagueItem;
