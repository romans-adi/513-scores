import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EventItem from '../components/Items/EventItem';

describe('EventItem', () => {
  const event = {
    name: 'Event Name',
    start_at: '2023-06-30',
    id: 1,
    away_team: {
      logo: 'away_team_logo.png',
    },
    home_team: {
      logo: 'home_team_logo.png',
    },
  };

  it('renders event details correctly', () => {
    const { getByText, getByAltText } = render(
      <BrowserRouter>
        <EventItem event={event} index={0} />
      </BrowserRouter>,
    );

    const eventName = getByText('Event Name');
    expect(eventName).toBeInTheDocument();

    const eventDate = getByText('2023-06-30');
    expect(eventDate).toBeInTheDocument();

    const homeTeamLogo = getByAltText('Home Team Logo');
    expect(homeTeamLogo).toBeInTheDocument();
    expect(homeTeamLogo.src).toContain('home_team_logo.png');

    const awayTeamLogo = getByAltText('Away Team Logo');
    expect(awayTeamLogo).toBeInTheDocument();
    expect(awayTeamLogo.src).toContain('away_team_logo.png');
  });

  it('applies correct background color based on index', () => {
    const { container } = render(
      <BrowserRouter>
        <EventItem event={event} index={0} />
        <EventItem event={event} index={1} />
      </BrowserRouter>,
    );

    const eventItems = container.querySelectorAll('.event-item');
    expect(eventItems[0]).toHaveStyle('background-color: rgba(65, 103, 174, 1)');
    expect(eventItems[1]).toHaveStyle('background-color: rgba(65, 103, 174, 0.5)');
  });
});
