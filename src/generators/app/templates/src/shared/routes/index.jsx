import React from 'react';
import {
  Switch,
  withRouter
} from 'react-router';
import CustomRoute from './CustomRoute';

// Routes Components
import Home from './Home';
import LoginPage from './Login';
import NotFoundPage from './NotFoundPage';


const Routes = () => (
  <Switch>
    <CustomRoute exact path="/" secure component={Home} ifSecureRedirectTo="/login" status={301} />
    <CustomRoute path="/login" component={LoginPage} ifLoggedRedirectTo="/" status={301} />
    <CustomRoute path="*" component={NotFoundPage} status={404} />
  </Switch>
);


export default withRouter(Routes);
