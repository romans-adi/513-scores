import React from 'react';
import PropTypes from 'prop-types';
import './EventItem.scss';

const EventItem = ({
  name, id, startAt, awayTeam, homeTeam, index,
}) => (
  <li className="event-item" style={{ backgroundColor: index % 2 === 0 ? 'rgb(65, 103, 174)' : 'rgba(65, 103, 174, 0.5)' }}>
    <span>{startAt}</span>
    <a href={`/events/${id}`}>{name}</a>
    <div className="logos">
      <img alt="Home Team Logo" src={homeTeam.logo} />
      <div className="vs">VS</div>
      <img alt="Away Team Logo" src={awayTeam.logo} />
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
