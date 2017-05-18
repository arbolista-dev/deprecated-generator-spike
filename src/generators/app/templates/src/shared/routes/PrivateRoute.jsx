import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, loggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      loggedIn
        ? <Component {...props} />
        :
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
    )}
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape({}),
  loggedIn: PropTypes.bool.isRequired
};

PrivateRoute.defaultProps = {
  location: {}
};

export default PrivateRoute;
