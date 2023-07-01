import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import LoadingIndicator from '../components/Indicators/LoadingIndicator';
import ErrorIndicator from '../components/Indicators/ErrorIndicator';
import {
  fetchCategoriesData,
  fetchTotalEventsData,
} from '../redux/categories/categoriesSlice';
import CategoryItem from '../components/Items/Category/CategoryItem';
import getLeagueItemBackgroundColor from '../assets/colorUtils';
import { handleCategoryClick } from '../handleActions';

const Home = () => {
  const dispatch = useDispatch();
  const {
    categories,
    isLoadingCategories,
    isLoadingTotalEvents,
    error,
    totalEventsBySport,
  } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategoriesData());
  }, [dispatch]);

  useEffect(() => {
    const fetchTotalEvents = async () => {
      if (categories && categories.length > 0) {
        await dispatch(fetchTotalEventsData());
      }
    };

    fetchTotalEvents();
  }, [categories, dispatch]);

  if (isLoadingCategories || isLoadingTotalEvents) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <ErrorIndicator className="error-text" error={error} />;
  }

  if (!categories || categories.length === 0) {
    return <p className="error-text">No categories found.</p>;
  }

  const sortedCategories = categories.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="categories-container">
      {sortedCategories.map((category, index) => {
        const totalEvents = totalEventsBySport && totalEventsBySport[category.id];
        return (
          <CategoryItem
            data-testid="categoryEl"
            key={category.id}
            category={category}
            handleCategoryClick={() => handleCategoryClick(category.id, dispatch)}
            backgroundColor={getLeagueItemBackgroundColor(index)}
            totalEvents={totalEvents}
          />
        );
      })}
    </div>
  );
};

export default Home;
