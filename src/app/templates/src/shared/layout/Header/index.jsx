import React from 'react';
import PropTypes from 'prop-types';
import container from './Header.container';


const userHeader = (user, logout) => (
  <div id="Welcome" className="user-info">
    Welcome {user.attributes.username} <span>- </span>
    <button
      id="LogoutButton"
      onClick={() => { logout(); }}
    >Logout</button>
  </div>
);

const Header = ({ user, authentication, logout }) => (
  <header>
    <h1>Header</h1>
    { authentication.loggingIn ? <div>'logging in...'</div> : null}
    { authentication.loggedIn ? userHeader(user, logout) : (<i>You are not logged in!</i>) }
  </header>
);

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({})
};

export default container(Header);
