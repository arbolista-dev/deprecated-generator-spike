import React from 'react';
import {
  Switch,
  withRouter
} from 'react-router';
import SwitchRoute from './SwitchRoute';

// Routes Components
import Home from './Home';
import LoginPage from './Login';
import NotFoundPage from './NotFoundPage';


const Routes = () => (
  <Switch>
    <SwitchRoute exact path="/" secure component={Home} ifSecureRedirectTo="/login" status={301} />
    <SwitchRoute path="/login" component={LoginPage} ifLoggedRedirectTo="/" status={301} />
    <SwitchRoute path="*" component={NotFoundPage} status={404} />
  </Switch>
);


export default withRouter(Routes);
