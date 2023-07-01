import React from 'react';
import { render } from '@testing-library/react';
import { useSelector } from 'react-redux';

import '@testing-library/jest-dom/extend-expect';
import LeaguePage from '../views/LeaguePage';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('../handleActions', () => ({
  handleLeagueClick: jest.fn(),
}));

describe('LeaguePage', () => {
  it('renders the LeagueItem with the selected league correctly', () => {
    const selectedLeague = {
      id: 1,
      name: 'League Name',
      logo: 'league_logo.png',
    };

    useSelector.mockImplementation((selectorFn) => selectorFn({ categories: { selectedLeague } }));

    const { getByTestId } = render(<LeaguePage />);

    const leagueItem = getByTestId('league-item');

    expect(leagueItem).toBeInTheDocument();
  });
});
