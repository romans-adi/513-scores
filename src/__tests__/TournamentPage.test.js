import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import TournamentPage from '../views/TournamentPage';
import { handleTournamentClick } from '../handleActions';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../handleActions', () => ({
  handleTournamentClick: jest.fn(),
}));

const mockDispatch = jest.fn();
const mockNavigate = jest.fn();

describe('TournamentPage', () => {
  beforeEach(() => {
    useSelector.mockImplementation((selectorFn) => selectorFn({
      categories: {
        tournaments: [
          { eventId: 1, name: 'Tournament 1' },
          { eventId: 2, name: 'Tournament 2' },
        ],
      },
    }));

    useDispatch.mockReturnValue(mockDispatch);
    useNavigate.mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders tournaments', () => {
    render(<TournamentPage />);

    const tournament1 = screen.getByText('Tournament 1');
    const tournament2 = screen.getByText('Tournament 2');

    expect(tournament1).toBeInTheDocument();
    expect(tournament2).toBeInTheDocument();
  });

  test('calls handleTournamentClick when a tournament item is clicked', () => {
    render(<TournamentPage />);

    const tournamentItem = screen.getByText('Tournament 1');
    fireEvent.click(tournamentItem);

    expect(handleTournamentClick).toHaveBeenCalledWith(
      1,
      mockDispatch,
      mockNavigate,
    );
  });

  test('displays "No tournaments available" when no tournaments are present', () => {
    useSelector.mockImplementation((selectorFn) => selectorFn({
      categories: {
        tournaments: [],
      },
    }));

    render(<TournamentPage />);

    const noTournamentsText = screen.getByText('No tournaments available.');
    expect(noTournamentsText).toBeInTheDocument();
  });
});
