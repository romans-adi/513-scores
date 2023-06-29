/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingIndicator from '../components/Indicators/LoadingIndicator';
import ErrorIndicator from '../components/Indicators/ErrorIndicator';
import { fetchCategoriesData, setTournamentList } from '../redux/categories/categoriesSlice';
import CategoryItem from '../components/Items/CategoryItem';
import getLeagueItemBackgroundColor from '../colorUtils';
import { handleCategoryClick } from '../handleActions';

const Home = () => {
  const dispatch = useDispatch();
  const { categories, isLoading, error } = useSelector((state) => state.categories);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator error={error} />;
  }

  if (!categories || categories.length === 0) {
    return <p>No categories found.</p>;
  }

  const sortedCategories = categories
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="leagues-container">
      {sortedCategories.map((category, index) => (
        <CategoryItem
          key={category.id}
          category={category}
          handleCategoryClick={() => handleCategoryClick(category.id, dispatch, navigate, setTournamentList)}
          style={{ backgroundColor: getLeagueItemBackgroundColor(index) }}
          index={index}
        />
      ))}
    </div>
  );
};

export default Home;
