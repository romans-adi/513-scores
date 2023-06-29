import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Filter = ({ onFilter }) => {
  const [filterValue, setFilterValue] = useState('');

  const handleInputChange = (event) => {
    const { value } = event.target;
    setFilterValue(value);
    onFilter(value);
  };

  return (
    <div className="filter-container">
      <input
        type="text"
        placeholder="Filter..."
        value={filterValue}
        onChange={handleInputChange}
      />
      <button type="button" onClick={() => onFilter('')}>Reset</button>
    </div>
  );
};

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default Filter;
