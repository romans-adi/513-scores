/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import getLeagueItemBackgroundColor from '../../colorUtils';

const EventItem = ({ event, id }) => (
  <li key={event.name} style={{ backgroundColor: getLeagueItemBackgroundColor(id) }}>{event.name}</li>
);

EventItem.propTypes = {
  id: PropTypes.number.isRequired,
  event: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventItem;
