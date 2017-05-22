/* eslint no-param-reassign: ["error", { "props": false }] */
import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

const RouteWithStatus = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code;
      }
      return children;
    }}
  />
);

RouteWithStatus.propTypes = {
  code: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired
};


export default RouteWithStatus;
