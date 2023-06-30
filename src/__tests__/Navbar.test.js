import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Navbar from '../components/Navbar/Navbar';

describe('Navbar', () => {
  it('renders correctly', () => {
    const { getByText, getByRole } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const allEvents = getByText('All Events');
    const hamburgerMenu = getByRole('img', { name: 'GiHamburgerMenu' });
    const micIcon = getByRole('img', { name: 'BiMicrophone' });
    const gearIcon = getByRole('img', { name: 'BsFillGearFill' });

    expect(allEvents).toBeInTheDocument();
    expect(hamburgerMenu).toBeInTheDocument();
    expect(micIcon).toBeInTheDocument();
    expect(gearIcon).toBeInTheDocument();
  });

  it('navigates back when goBack is called', () => {
    const history = createMemoryHistory();
    history.push('/some-page');

    const { getByRole } = render(
      <Router history={history}>
        <Navbar />
      </Router>,
    );

    const backButton = getByRole('link');
    fireEvent.click(backButton);

    expect(history.location.pathname).toBe('/');
  });
});
