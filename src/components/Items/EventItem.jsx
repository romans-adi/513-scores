import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './EventItem.scss';

const EventItem = ({
  name, id, startAt, awayTeam, homeTeam, index,
}) => (
  <li key={name} className="event-item" style={{ backgroundColor: index % 2 === 0 ? 'rgba(65, 103, 174, 1)' : 'rgba(65, 103, 174, 0.5)' }}>
    <span>{startAt}</span>
    <Link to={`/events/${id}`}>{name}</Link>
    <div className="logos">
      <img src={homeTeam.logo} alt="Home Team Logo" />
      {' '}
      <div className="vs">VS</div>
      {' '}
      <img src={awayTeam.logo} alt="Away Team Logo" />
    </div>
  </li>
);

EventItem.propTypes = {
  name: PropTypes.string,
  id: PropTypes.number,
  startAt: PropTypes.string,
  awayTeam: PropTypes.shape({
    logo: PropTypes.string,
  }),
  homeTeam: PropTypes.shape({
    logo: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
};

EventItem.defaultProps = {
  name: '',
  id: null,
  startAt: '',
  awayTeam: {
    logo: '',
  },
  homeTeam: {
    logo: '',
  },
};

export default EventItem;
