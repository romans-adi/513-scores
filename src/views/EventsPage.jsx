import React from 'react';
import { useSelector } from 'react-redux';
import EventItem from '../components/Items/EventItem';
import './Home.scss';

const EventsPage = () => {
  const eventList = useSelector((state) => state.categories.events.payload || []);

  console.log(eventList);

  return (
    <div className="events-container">
      <h3>Events:</h3>
      <ul>
        {eventList.map((event, index) => (
          <EventItem name={event.name} id={event.id} key={event.id} event={event} index={index} />
        ))}
      </ul>
    </div>
  );
};

export default EventsPage;
