/* eslint no-param-reassign: ["error", { "props": false }] */

import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter, Redirect } from 'react-router';
import { connect } from 'react-redux';

export const RouteWithStatus = ({ code, children }) => (
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

export const RedirectWithStatus = ({ from, to, status }) => (
  <Route
    render={({ staticContext }) => {
      // there is no `staticContext` on the client, so
      // we need to guard against that here
      if (staticContext) {
        staticContext.status = status;
      }

      return (
        <Redirect from={from} to={to} />
      );
    }}
  />
);

RedirectWithStatus.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired
};


const SwitchRoute = ({
  path,
  component: Component,
  exact,
  secure,
  status,
  ifLoggedRedirectTo,
  ifSecureRedirectTo,
  loggedIn
}) => (
  <Route
    path={path}
    exact={exact}
    render={() => {
      if (secure) {
        // this is a private route
        if (loggedIn) {
          return (
            <RouteWithStatus code={status}>
              <Component />
            </RouteWithStatus>
          );
        }
        // if the user is not logged in redirect to the ifSecureRedirectTo path
        return (
          <RedirectWithStatus
            status={status}
            from={path}
            to={ifSecureRedirectTo}
          />
        );
      }
      // this route is not secured
      if (ifLoggedRedirectTo) {
        // if this flag is true check if the user is logged or not
        if (!loggedIn) {
          return (
            <RouteWithStatus code={status}>
              <Component />
            </RouteWithStatus>
          );
        }
        // if the user is not logged in redirect to the ifLoggedRedirectTo path
        return (
          <RedirectWithStatus
            status={status}
            from={path}
            to={ifLoggedRedirectTo}
          />
        );
      }
      // if ifLoggedRedirectTo was not set is because this is just a simple route and we don't care
      // if the user is logged or not.
      return (
        <RouteWithStatus code={status}>
          <Component />
        </RouteWithStatus>
      );
    }}
  />
);

SwitchRoute.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string,
  exact: PropTypes.bool,
  secure: PropTypes.bool,
  status: PropTypes.number,
  ifLoggedRedirectTo: PropTypes.string,
  ifSecureRedirectTo: PropTypes.string,
  loggedIn: PropTypes.bool.isRequired
};

SwitchRoute.defaultProps = {
  path: '*',
  exact: false,
  secure: false,
  status: 200,
  ifLoggedRedirectTo: undefined,
  ifSecureRedirectTo: undefined
};

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn
});

export default connect(mapStateToProps)(SwitchRoute);
