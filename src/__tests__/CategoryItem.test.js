import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CategoryItem from '../components/Items/Category/CategoryItem';

describe('CategoryItem', () => {
  const category = {
    id: 1,
    name: 'Basketball',
    emoji: '🏀',
  };

  const handleCategoryClick = jest.fn();

  it('renders category name and emoji correctly', () => {
    const { getByText } = render(
      <CategoryItem
        category={category}
        handleCategoryClick={handleCategoryClick}
        backgroundColor="#ffffff"
      />,
    );

    const categoryName = getByText('Basketball');
    const categoryEmoji = getByText('🏀');

    expect(categoryName).toBeInTheDocument();
    expect(categoryEmoji).toBeInTheDocument();
  });

  it('calls handleCategoryClick when clicked', () => {
    const { getByRole } = render(
      <CategoryItem
        category={category}
        handleCategoryClick={handleCategoryClick}
        backgroundColor="#ffffff"
      />,
    );

    const button = getByRole('button');
    fireEvent.click(button);

    expect(handleCategoryClick).toHaveBeenCalledTimes(1);
    expect(handleCategoryClick).toHaveBeenCalledWith(1);
  });
});
