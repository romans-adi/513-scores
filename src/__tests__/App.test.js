import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import App from '../App';

describe('App', () => {
  it('renders the home page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Home page')).toBeInTheDocument();
  });

  it('renders the tournament page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/tournament']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Tournament page')).toBeInTheDocument();
  });

  it('renders the league page', () => {
    const leagueId = '123';
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/league/${leagueId}`]}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText(`League page: ${leagueId}`)).toBeInTheDocument();
  });

  it('renders the events page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/events/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Events page')).toBeInTheDocument();
  });

  it('renders the details page', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/details']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByText('Details page')).toBeInTheDocument();
  });
});
