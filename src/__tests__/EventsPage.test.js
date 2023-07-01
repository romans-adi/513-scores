import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import EventsPage from '../views/EventsPage';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('EventsPage', () => {
  afterEach(() => {
    useSelector.mockClear();
  });

  test('renders the event list', async () => {
    const events = [
      {
        id: 1,
        name: 'Event 1',
        start_at: '2023-07-01',
        away_team: { logo: 'Away Team A Logo' },
        home_team: { logo: 'Home Team B Logo' },
      },
      {
        id: 2,
        name: 'Event 2',
        start_at: '2023-07-02',
        away_team: { logo: 'Away Team C Logo' },
        home_team: { logo: 'Home Team D Logo' },
      },
    ];
    useSelector.mockReturnValue(events);

    render(
      <BrowserRouter>
        <EventsPage />
      </BrowserRouter>,
    );

    const eventItems = screen.getAllByRole('listitem');
    expect(eventItems).toHaveLength(events.length);

    await waitFor(() => {
      eventItems.forEach((eventItem, index) => {
        const event = events[index];
        const linkElement = eventItem.querySelector('a');
        expect(linkElement).toBeInTheDocument();
        expect(linkElement).toHaveAttribute('href', `/events/${event.id}`);
        expect(linkElement).toHaveTextContent(event.name);
        expect(eventItem).toHaveTextContent(event.start_at);
        expect(eventItem.querySelector('img[alt="Away Team Logo"]')).toBeInTheDocument();
        expect(eventItem.querySelector('img[alt="Home Team Logo"]')).toHaveAttribute('src', event.home_team.logo);
      });
    });
  });
});
