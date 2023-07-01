import React from 'react';
import { render } from '@testing-library/react';
import LeagueItem from '../components/Items/League/LeagueItem';
import '@testing-library/jest-dom/extend-expect';

describe('LeagueItem', () => {
  it('displays the league name correctly', () => {
    const league = {
      name: 'League Name',
      logo: 'league_logo.png',
    };
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <LeagueItem
        name={league.name}
        logo={league.logo}
        handleClick={handleClick}
        id={null}
      />,
    );
    const leagueName = getByTestId('league-name').textContent;

    expect(leagueName).toBe('League Name');
  });

  it('displays the league logo correctly', () => {
    const league = {
      name: 'League Name',
      logo: 'league_logo.png',
    };
    const handleClick = jest.fn();
    const { getByTestId } = render(
      <LeagueItem
        name={league.name}
        logo={league.logo}
        handleClick={handleClick}
        id={null}
      />,
    );
    const leagueLogo = getByTestId('league-logo');

    expect(leagueLogo).toBeInTheDocument();
    expect(leagueLogo.getAttribute('src')).toContain('league_logo.png');
    expect(leagueLogo.getAttribute('alt')).toBe('League Name');
  });
});
