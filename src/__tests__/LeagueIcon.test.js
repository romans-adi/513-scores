import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LeagueIcon from '../components/Items/LeagueIcon';

describe('LeagueIcon', () => {
  const mockHandleClick = jest.fn();

  const league = {
    id: 1,
    name: 'League Name',
    logo: 'league_logo.png',
  };

  it('renders league details correctly', () => {
    const { getByText, getByAltText } = render(
      <LeagueIcon
        id={league.id}
        name={league.name}
        logo={league.logo}
        handleClick={mockHandleClick}
      />,
    );

    const leagueName = getByText('League Name');
    expect(leagueName).toBeInTheDocument();

    const leagueLogo = getByAltText('League Name');
    expect(leagueLogo).toBeInTheDocument();
    expect(leagueLogo.src).toContain('league_logo.png');
  });

  it('calls handleClick function when clicked', () => {
    const { getByText } = render(
      <LeagueIcon
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

  it('applies correct background color', () => {
    const { container } = render(
      <LeagueIcon
        id={1}
        name="League Name"
        logo="league_logo.png"
        handleClick={mockHandleClick}
      />,
    );

    const leagueIcon = container.querySelector('.league-icon');
    expect(leagueIcon).toHaveStyle('background-color: rgb(65, 103, 174)');
  });
});
