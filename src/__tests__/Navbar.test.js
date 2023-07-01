import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import Navbar from '../components/Navbar/Navbar';
import store from '../redux/store';

test('Navbar renders correctly', () => {
  const { getByText, getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </Provider>,
  );

  const allEvents = getByText('All Events');
  const hamburgerMenu = getByTestId('hamburger-menu');
  //
});

test('Navbar navigates back when goBack is called', () => {
  const history = createMemoryHistory();
  history.push('/some-page');

  const { getByTestId } = render(
    <Provider store={store}>
      <BrowserRouter history={history}>
        <Navbar />
      </BrowserRouter>
    </Provider>,
  );

  const backButton = getByTestId('back-button');
  fireEvent.click(backButton);

  expect(history.location.pathname).toBe('/');
});
