import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './CategoryItem.scss';

const categoryImages = {
  basketball: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDuR91qeq4DSIIPD6BmFYvIk_-I_HkB5NV3g&usqp=CAU',
  football: 'https://images.mlssoccer.com/image/private/t_editorial_landscape_8_desktop_mobile/prd-league/cabxy2tharprmvqtmu5g.jpg',
  tennis: 'https://static.lsm.lv/media/2017/06/large/1/7rq9.jpg',
  'ice hockey': 'https://static.lsm.lv/media/2018/05/large/1/9cff.jpg',
  volleyball: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTPBTESS7Rq230TxYKFGgI3ZbFU6tbBKlzUg&usqp=CAU',
  handball: 'https://www.eurohandball.com/media/4i2l20g1/dsc03525-x3.jpg?center=0.22022570831098906,0.49995968967477677&mode=crop&width=1020&height=720&rnd=133227834492430000',
};

const CategoryItem = ({
  category, handleCategoryClick, totalEvents,
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

  const categoryImage = categoryImages[category.name.toLowerCase()];

  return (
    <div className="category-item" key={category.id}>
      <button
        className="category-button"
        type="button"
        onClick={() => handleCategoryClick(category.id)}
      >
        <div className="category-logo">
          <img
            src={categoryImage}
            alt={category.name}
            className="category-image"
          />
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
};

CategoryItem.defaultProps = {
  totalEvents: undefined,
};

export default CategoryItem;
