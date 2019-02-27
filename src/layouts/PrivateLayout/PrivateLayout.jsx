import React from 'react';
import PropTypes from 'prop-types';
import { NavBar, Footer } from '../components';

const PrivateLayout = ({ children }) => (
  <>
    <div style={{ height: '100vh' }}>
      <NavBar />
      <div style={{ padding: '10px' }}>{children}</div>
      <Footer />
    </div>
  </>
);

PrivateLayout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PrivateLayout;
