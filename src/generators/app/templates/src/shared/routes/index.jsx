import React from 'react';
import PropTypes from 'prop-types';
import {
  Route,
  Redirect,
  Switch,
  BrowserRouter as Router
} from 'react-router-dom';
import { connect } from 'react-redux';
import PrivateRoute from './PrivateRoute';

// Routes Components
import Home from './Home';
import Login from './Login';
import NotFoundPage from './NotFoundPage';

const Routes = ({ loggedIn }) => (
  <Router>
    <Switch>
      <PrivateRoute path="/" exact component={Home} loggedIn={loggedIn} />
      <Route
        path="/login"
        render={props => (
          !loggedIn
            ? <Login {...props} />
            :
            <Redirect
              to={{
                pathname: '/',
                state: { from: props.location }
              }}
            />
        )}
      />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);

GetRoutesContent.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  location: PropTypes.shape({})
};

GetRoutesContent.defaultProps = {
  location: {}
};

const mapStateToProps = state => ({
  loggedIn: state.authentication.loggedIn
});

export default connect(mapStateToProps)(Routes);
