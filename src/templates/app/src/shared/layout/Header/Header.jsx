import React, { PropTypes } from 'react';
import { Route, Link } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { userTypes, authenticationTypes } from '../../types';
import container from './Header.container';

const signInOrRegisterPrompt = location => {
  ({ location }) => {
    if (location.pathname === '/login') {
      return (
        <div className="user-info">
          {'I don\'t have an account '}<Link to="/register">Sign Up</Link>
        </div>
      );
    }
    return (
      <div className="user-info">
        Already have an account? <Link to="/login">Sign In</Link>
      </div>
    );
  }
}

const userHeader = user => {
  <div className="user-info">
    Welcome {user.name} <span>-</span>
    <a
      href="/logout"
      onClick={(evt) => {
        evt.preventDefault();
        handleLogOut();
      }}
    >LogOut</a>
    <span className="icon-settings">
      <span className="path1" />
      <span className="path2" />
    </span>
  </div>
}

const Header = ({ user, loggedIn, history }) => (
  <header>
    <div className="nav-toggle">&#9776;</div>
    { loggedIn ?
      userHeader(user)
    :
      <ConnectedRouter history={history}>
        <Route
          render={signInOrRegisterPrompt(location)}
        />
      </ConnectedRouter>
    }
  </header>
);

Header.propTypes = {
  userLogged: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.shape({}).isRequired
};

export default container(Header);

