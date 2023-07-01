import React from 'react';
import { render } from '@testing-library/react';
import EventItem from '../components/Items/Event/EventItem';

test('renders EventItem component', () => {
  const mockProps = {
    name: 'Test Event',
    id: 1,
    startAt: '2023-07-01T12:00:00Z',
    awayTeam: {
      logo: 'https://tipsscore.com/resb/team/bc-hallmann-vienna.png',
    },
    homeTeam: {
      logo: 'home-logo.png',
    },
    index: 0,
  };

  render(
    <EventItem
      name={mockProps.name}
      id={mockProps.id}
      startAt={mockProps.startAt}
      awayTeam={mockProps.awayTeam}
      homeTeam={mockProps.homeTeam}
      index={mockProps.index}
    />,
  );
});
