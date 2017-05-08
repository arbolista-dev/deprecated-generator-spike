import React, { PropTypes } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import routes from '../routes';
import register from '../utils/redux-register';

import Header from './Header';
import Login from './Login';

import '../assets/scss/main.scss';

function renderRoutes(props){
  const {loggedIn} = props;
  // redirect.
  routes
    .filter(route => route.path !== '/login')
    .map(route =>{
      if (route.secure && !loggedIn){
        return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
      }
      return <route.component {...props}/>
    });
}

function renderLogin(props){
  const {loggedIn} = props;
  const loginRoute = routes.find(route => route.path === '/login');
  if (loggedIn){
    return <Redirect to={{pathname: '/'}} from={{props.location}}/>
  }
  <Route path={'/login'} component={loginRoute.component}/>
}

const Layout = (props) => (
  <div className="root">
    <div className="wrap">
      <Header />
      <Switch>
        {renderLogin(props)}
        {renderRoute(props)}
      </Switch>
    </div>

  </div>
);

export default register(
  ['modalSelector', 'layoutSelector'],
  [],
  Layout
);
