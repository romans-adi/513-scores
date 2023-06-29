import React from 'react';
import PropTypes from 'prop-types';
import '../../views/Home.scss';
import getLeagueItemBackgroundColor from '../../colorUtils';

const LeagueIcon = ({
  logo, name, handleClick, id,
}) => (
  <button
    type="button"
    className="league-icon"
    onClick={handleClick}
    style={{ backgroundColor: getLeagueItemBackgroundColor(id) }}
  >
    <img src={logo} alt={name} />
    <span>{name}</span>
  </button>
);

LeagueIcon.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  logo: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

LeagueIcon.defaultProps = {
  name: '',
  id: null,
  logo: null,
};

export default LeagueIcon;
