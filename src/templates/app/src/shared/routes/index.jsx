import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import selectors from 'shared/redux/selectors';
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
  loggedIn: PropTypes.bool.isRequired
};

const ProtectedLogin = (props)=>{
  const { loggedIn } = props;
  if (loggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }
  return <Route exact path={'/login'} component={Login} />;
}
ProtectedLogin.propTypes = propTypes;

const ProtectedRoutes = (props) => {
  const { loggedIn } = props;
  return routes
    .filter(route => route.props.path !== '/login')
    .map((route) => {
      if (route.secure && !loggedIn) {
        return <Redirect to={{ pathname: '/login' }} />;
      }
      return <Route key={route.props.path} {...route.props} />;
    });
}
ProtectedRoutes.propTypes = propTypes;

const Routes = props => (
  <Switch>
    <ProtectedLogin {...props}/>
    <ProtectedRoutes {...props}/>
  </Switch>
);

Routes.propTypes = propTypes

const mapStateToProps = state => ({
  loggedIn: selectors.authentication.loggedIn(state)
});

export default connect(mapStateToProps)(Routes);

