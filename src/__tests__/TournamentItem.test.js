import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TournamentItem from '../components/Items/TournamentItem';

const mockHandleTournamentClick = jest.fn();

describe('TournamentItem', () => {
  const tournament = {
    name: 'Tournament Name',
    countryCode: 'US',
    eventId: 1,
    eventCount: 10,
  };

  it('renders correctly', () => {
    const { getByText, getByRole } = render(
      <TournamentItem
        index={1}
        tournament={tournament}
        handleTournamentClick={mockHandleTournamentClick}
      />,
    );

    const tournamentItem = getByRole('button');
    const countryName = getByText('Tournament Name');
    const flagEmoji = getByRole('img');
    const eventCount = getByText('(10)');

    expect(tournamentItem).toBeInTheDocument();
    expect(countryName).toBeInTheDocument();
    expect(flagEmoji).toBeInTheDocument();
    expect(eventCount).toBeInTheDocument();
  });

  it('calls handleTournamentClick when clicked', () => {
    const { getByRole } = render(
      <TournamentItem
        index={1}
        tournament={tournament}
        handleTournamentClick={mockHandleTournamentClick}
      />,
    );

    const tournamentItem = getByRole('button');
    fireEvent.click(tournamentItem);

    expect(mockHandleTournamentClick).toHaveBeenCalledTimes(1);
    expect(mockHandleTournamentClick).toHaveBeenCalledWith(1); // eventId
  });
});
