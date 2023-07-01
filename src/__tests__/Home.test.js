import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Home from '../views/Home';

jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

describe('Home', () => {
  const dispatchMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    useDispatch.mockReturnValue(dispatchMock);
    useSelector.mockImplementation((callback) => callback({
      categories: {
        categories: [
          { id: 1, name: 'Category 1' },
          { id: 2, name: 'Category 2' },
        ],
        isLoadingCategories: false,
        isLoadingTotalEvents: false,
        error: null,
        totalEventsBySport: {
          1: 10,
          2: 5,
        },
      },
    }));
    useNavigate.mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders categories correctly', async () => {
    const { getByText } = render(<Home />);

    await waitFor(() => {
      expect(getByText('Category 1')).toBeInTheDocument();
      expect(getByText('Category 2')).toBeInTheDocument();
    });
  });

  it('calls handleCategoryClick correctly', async () => {
    const { getByText } = render(<Home />);
    const category1 = getByText('Category 1');
    const category2 = getByText('Category 2');

    category1.click();
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
    expect(navigateMock).toHaveBeenCalledWith('/category/1');

    category2.click();
    expect(dispatchMock).toHaveBeenCalledWith(expect.any(Function));
    expect(navigateMock).toHaveBeenCalledWith('/category/2');
  });
});
