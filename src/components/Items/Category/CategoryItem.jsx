import React, { useState, useEffect } from 'react';
import Ripples from 'react-ripples';
import { FiArrowRightCircle } from 'react-icons/fi';
import PropTypes from 'prop-types';
import './CategoryItem.scss';

const categoryEmojis = {
  basketball: '🏀',
  football: '⚽️',
  tennis: '🎾',
  'ice hockey': '🏒',
  volleyball: '🏐',
  handball: '🤾',
};

const CategoryItem = ({
  category, handleCategoryClick, totalEvents, backgroundColor,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading && totalEvents !== null) {
      setIsLoading(false);
    }
  }, [isLoading, totalEvents]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="category-item" key={category.id} style={{ backgroundColor }}>
      <Ripples>
        <button
          className="category-button"
          type="button"
          onClick={() => handleCategoryClick(category.id)}
        >
          <div>
            <FiArrowRightCircle className="arrow-icon" />
            <span className="category-logo" role="img" aria-label={`${category.name} Emoji`}>
              {categoryEmojis[category.name.toLowerCase()]}
            </span>
            <div className="category-data">
              <span className="category-name">{category.name}</span>
              <span className="events-count">
                {' '}
                (
                {' '}
                {totalEvents !== null ? totalEvents : 'N/A'}
                )
              </span>
            </div>
          </div>
        </button>
      </Ripples>
    </div>
  );
};
CategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
  totalEvents: PropTypes.number,
  backgroundColor: PropTypes.string.isRequired,
};
CategoryItem.defaultProps = {
  totalEvents: undefined,
};

export default CategoryItem;
