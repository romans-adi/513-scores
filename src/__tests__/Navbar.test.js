import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter, useLocation, useHistory } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import userEvent from '@testing-library/user-event';
import Navbar from '../components/Navbar/Navbar';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLocation: jest.fn(),
  useHistory: jest.fn(),
}));

describe('Navbar component', () => {
  const mockStore = configureStore([]);
  const initialState = {
    categories: {
      tournaments: [
        { name: 'Tournament 1' },
        { name: 'Tournament 2' },
        { name: 'Tournament 3' },
      ],
    },
  };

  test('should display the actual page name', () => {
    const store = mockStore(initialState);
    useLocation.mockReturnValue({ pathname: '/' });

    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    const pageTitle = getByTestId('current-page');
    expect(pageTitle.textContent).toBe('All Events');
  });

  test('should render correctly when on the main page', () => {
    const store = mockStore(initialState);
    useLocation.mockReturnValue({ pathname: 'home' });

    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    const hamburgerMenu = getByTestId('hamburger-menu');
    expect(hamburgerMenu).toBeInTheDocument();
  });

  test('should render the back button when not on the home page', () => {
    const store = mockStore(initialState);
    const history = {
      location: {
        pathname: '/tournaments',
      },
      goBack: jest.fn(),
    };
    useLocation.mockReturnValue({ pathname: history.location.pathname });
    useHistory.mockReturnValue(history);

    const { getByTestId } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    const backButton = getByTestId('back-button');
    expect(backButton).toBeInTheDocument();

    userEvent.click(backButton);

    setTimeout(() => {
      expect(history.goBack).toHaveBeenCalledTimes(1);
    }, 0);
  });
});
