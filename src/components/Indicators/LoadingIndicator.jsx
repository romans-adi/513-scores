import React from 'react';
import ReactLoading from 'react-loading';
import PropTypes from 'prop-types';

const LoadingIndicator = ({ type, color }) => (
  <ReactLoading type={type} color={color} height="667px" width="375px" />
);

LoadingIndicator.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

export default LoadingIndicator;
