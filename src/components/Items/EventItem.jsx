import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './EventItem.scss';

const EventItem = ({ event, index }) => (
  <li key={event.name} className="event-item" style={{ backgroundColor: index % 2 === 0 ? 'rgba(65, 103, 174, 1)' : 'rgba(65, 103, 174, 0.5)' }}>
    <span>{event.start_at}</span>
    <Link to={`/events/${event.id}`}>{event.name}</Link>
    <div className="logos">
      <img src={event.home_team.logo} alt="Home Team Logo" />
      {' '}
      VS
      {' '}
      <img src={event.away_team.logo} alt="Away Team Logo" />
    </div>
  </li>
);

EventItem.propTypes = {
  event: PropTypes.shape({
    name: PropTypes.string,
    start_at: PropTypes.string,
    id: PropTypes.number,
    away_team: PropTypes.shape({
      logo: PropTypes.string,
    }),
    home_team: PropTypes.shape({
      logo: PropTypes.string,
    }),
  }),
  index: PropTypes.number.isRequired,
};

EventItem.defaultProps = {
  event: {},
};

export default EventItem;
