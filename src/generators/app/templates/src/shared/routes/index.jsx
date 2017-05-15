import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router';
import Home from './Home';
import Login from './Login';

const routes = [
  {
    secure: true,
    props: {
      component: Home,
      path: '/',
      exact: true
    }
  }
];

const propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};

const Routes = ({loggedIn}) => (
  <div>
  <h2>Routes</h2>
  <Switch>
    {routes.map(route => route.secure && !loggedIn ? null : <Route key={route.props.path} {...route.props} />)}
    {loggedIn ? null : <Route key={'/login'} path={'/login'} component={Login} />}
    {loggedIn ? <Redirect to={'/'}/> : <Redirect to={'/login'}/> }
  </Switch>
  </div>
);

Routes.propTypes = propTypes

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn
});

export default withRouter(connect(mapStateToProps)(Routes));

