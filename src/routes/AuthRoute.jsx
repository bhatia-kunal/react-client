import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthLayout } from '../layouts';

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      !localStorage.jwtToken
        ? (
          <AuthLayout>
            <Component {...matchProps} />
          </AuthLayout>
        ) : <Redirect to="/" />
    )}
  />
);

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
};

export default AuthRoute;
