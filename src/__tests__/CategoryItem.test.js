import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CategoryItem from '../components/Items/CategoryItem';

describe('CategoryItem', () => {
  const category = {
    id: 1,
    name: 'Basketball',
  };

  const handleCategoryClick = jest.fn();

  it('renders category name and emoji correctly', () => {
    const { getByText } = render(
      <CategoryItem category={category} handleCategoryClick={handleCategoryClick} />,
    );

    const categoryName = getByText('Basketball');
    expect(categoryName).toBeInTheDocument();

    const categoryEmoji = getByText('🏀');
    expect(categoryEmoji).toBeInTheDocument();
  });

  it('calls handleCategoryClick when button is clicked', () => {
    const { getByRole } = render(
      <CategoryItem category={category} handleCategoryClick={handleCategoryClick} />,
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(handleCategoryClick).toHaveBeenCalledTimes(1);
    expect(handleCategoryClick).toHaveBeenCalledWith(1);
  });
});
