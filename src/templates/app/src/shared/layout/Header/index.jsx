import React, { PropTypes } from 'react';
import container from './Header.container';

const userHeader = (user, logout) => (
  <div className="user-info">
    Welcome {user.attributes.username} <span>-</span>
    <button
      onClick={() => { logout(); }}
    >Logout</button>
  </div>
);

const Header = ({ user, authentication, login, logout }) => (
  <header>
    { authentication.loggingIn ? <div>'logging in...'</div> : null}
    { authentication.loggedIn ?
      userHeader(user, logout)
    :
      (<button onClick={() => { login({ username: 'Bob', password: 'password' }); }}>Login</button>)
    }
  </header>
);

Header.propTypes = {
  authentication: PropTypes.shape({}).isRequired,
  user: PropTypes.shape({}),
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

export default container(Header);
