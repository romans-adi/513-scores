import React from 'react';
import Ripples from 'react-ripples';
import PropTypes from 'prop-types';
import '../../views/Home.scss';
import getLeagueItemBackgroundColor from '../../colorUtils';

const categoryEmojis = {
  basketball: '🏀',
  football: '⚽️',
  tennis: '🎾',
  'ice hockey': '🏒',
  volleyball: '🏐',
  handball: '🤾',
};

const CategoryItem = ({ category, handleCategoryClick }) => (
  <div key={category.id} style={{ backgroundColor: getLeagueItemBackgroundColor(category.id) }}>
    <Ripples>
      <button
        className="league-item"
        type="button"
        onClick={() => handleCategoryClick(category.id)}
      >
        <div>
          <span role="img" aria-label={`${category.name} Emoji`}>
            {categoryEmojis[category.name.toLowerCase()]}
          </span>
          <span>{category.name}</span>
        </div>
      </button>
    </Ripples>
  </div>
);

CategoryItem.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  handleCategoryClick: PropTypes.func.isRequired,
};

export default CategoryItem;
