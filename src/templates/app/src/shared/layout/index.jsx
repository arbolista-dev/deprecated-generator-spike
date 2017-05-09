import React, { PropTypes } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider, connect } from 'react-redux';
import selectors from 'shared/redux/selectors';
import routes from '../routes';
import Header from './Header';
import '../assets/css/main.scss';

function renderRoutes(props){
  const {loggedIn} = props;
  routes
    .filter(route => route.props.path !== '/login')
    .map(route =>{
      if (route.secure && !loggedIn){
        return <Redirect to={{pathname: '/login', state: {from: props.location}}}/>
      }
      return <route.component {...props}/>
    });
}

function renderLogin(props, context){
  const {loggedIn} = props;
  const loginRoute = routes.find(route => route.props.path === '/login');
  if (loggedIn){
    return <Redirect to={{pathname: '/'}} from={props.location}/>
  }
  <Route path={'/login'} component={loginRoute.component}/>
}

const Layout = (props) => (
  <div className="root">
    <div className="wrap">
      <Header />
      <Switch>
        {renderLogin(props)}
        {renderRoutes(props)}
      </Switch>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  loggedIn: selectors.authentication.loggedIn(state)
});
export default connect(mapStateToProps)(Layout);
