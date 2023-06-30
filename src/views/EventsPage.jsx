import React from 'react';
import { useSelector } from 'react-redux';
import EventItem from '../components/Items/EventItem';
import './Home.scss';

const EventsPage = () => {
  const eventList = useSelector((state) => state.categories.events.payload || []);

  return (
    <div className="events-container">
      <h3 className="event-heading">All Games</h3>
      <ul>
        {eventList.map((event, index) => (
          <EventItem
            name={event.name}
            id={event.id}
            startAt={event.start_at}
            awayTeam={event.away_team}
            homeTeam={event.home_team}
            key={event.id}
            index={index}
          />
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
