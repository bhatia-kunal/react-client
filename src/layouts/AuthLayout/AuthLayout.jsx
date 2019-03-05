import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components';

const AuthLayout = ({ children }) => (
  <div>
    <div>{children}</div>
    <Footer />
  </div>
);

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default AuthLayout;
