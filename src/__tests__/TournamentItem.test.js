import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TournamentItem from '../components/Items/Tournament/TournamentItem';

describe('TournamentItem', () => {
  const tournament = {
    id: 1,
    name: 'Tournament 1',
    countryCode: 'US',
    eventId: 123,
    eventCount: 5,
  };

  const mockHandleTournamentClick = jest.fn();

  it('renders correctly', () => {
    const { getByRole } = render(
      <TournamentItem
        tournament={tournament}
        handleTournamentClick={mockHandleTournamentClick}
        backgroundColor="#ffffff"
      />,
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(mockHandleTournamentClick).toHaveBeenCalledTimes(1);
    expect(mockHandleTournamentClick).toHaveBeenCalledWith(123);
  });
});
