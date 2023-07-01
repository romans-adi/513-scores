import React from 'react';
import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Home from '../views/Home';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../redux/categories/categoriesSlice', () => ({
  fetchCategoriesData: jest.fn(),
  fetchTotalEventsData: jest.fn(),
}));

describe('Home Component', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    useSelector.mockReturnValue({
      categories: [],
      isLoadingCategories: false,
      isLoadingTotalEvents: false,
      error: null,
      totalEventsBySport: {},
    });

    render(<Home />);
  });

  it('displays the loading indicator when loading', () => {
    useSelector.mockReturnValue({
      categories: [],
      isLoadingCategories: true,
      isLoadingTotalEvents: true,
      error: null,
      totalEventsBySport: {},
    });
  });
});
