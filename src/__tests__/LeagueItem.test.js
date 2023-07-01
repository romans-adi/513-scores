import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LeagueItem from '../components/Items/League/LeagueItem';

describe('LeagueItem', () => {
  const mockHandleClick = jest.fn();

  const league = {
    id: 1,
    name: 'League Name',
    logo: 'league_logo.png',
  };

  it('displays the league name correctly', () => {
    const { getByText } = render(
      <LeagueItem
        id={league.id}
        name={league.name}
        logo={league.logo}
        handleClick={mockHandleClick}
      />,
    );

    const leagueName = getByText('League Name');
    expect(leagueName).toBeInTheDocument();
  });

  it('displays the league logo correctly', () => {
    const { getByAltText } = render(
      <LeagueItem
        id={league.id}
        name={league.name}
        logo={league.logo}
        handleClick={mockHandleClick}
      />,
    );

    const leagueLogo = getByAltText('League Name');
    expect(leagueLogo).toBeInTheDocument();
    expect(leagueLogo.src).toContain('league_logo.png');
  });

  it('invokes handleClick when the button is clicked', () => {
    const { getByText } = render(
      <LeagueItem
        id={league.id}
        name={league.name}
        logo={league.logo}
        handleClick={mockHandleClick}
      />,
    );

    const leagueButton = getByText('League Name');
    fireEvent.click(leagueButton);

    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with default props when not provided', () => {
    const { queryByTestId } = render(
      <LeagueItem handleClick={mockHandleClick} />,
    );

    const leagueName = queryByTestId('league-name');
    const leagueLogo = queryByTestId('league-logo');

    expect(leagueName).toBeInTheDocument();
    expect(leagueName.textContent).toBe('');

    expect(leagueLogo).toBeInTheDocument();
    expect(leagueLogo.getAttribute('alt')).toBe('');
  });
});
