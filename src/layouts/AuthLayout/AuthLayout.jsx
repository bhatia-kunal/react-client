import React from 'react';
import PropTypes from 'prop-types';

const AuthLayout = ({ children }) => (
  <div>
    <div>{children}</div>
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthLayout;
