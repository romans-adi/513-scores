import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import getLeagueItemBackgroundColor from '../../colorUtils';
import './EventItem.scss';

const EventItem = ({ event, index }) => (
  <li key={event.name} className="huj" style={{ backgroundColor: getLeagueItemBackgroundColor(index) }}>
    <Link to={`/events/${event.id}`}>{event.name}</Link>
  </li>
);

EventItem.propTypes = {
  index: PropTypes.number.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventItem;
