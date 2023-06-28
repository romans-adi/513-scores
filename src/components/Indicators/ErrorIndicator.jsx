import React from 'react';
import PropTypes from 'prop-types';

const ErrorIndicator = ({ error }) => (
  <p>
    Error:
    {' '}
    {error}
  </p>
);

ErrorIndicator.propTypes = {
  error: PropTypes.string.isRequired,
};

export default ErrorIndicator;
