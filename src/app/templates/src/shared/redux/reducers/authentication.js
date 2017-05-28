import { createReducer } from 'redux-act';
import actions from 'shared/redux/actions';

const { authentication } = actions;

export default createReducer({
  [authentication.login]: (authState, _payload) => ({
    ...authState,
    loggingIn: true,
    loginError: null,
    token: null
  }),
  [authentication.loginSuccess]: (authState, { token }) => ({
    ...authState,
    loggingIn: false,
    loggedIn: true,
    loginError: null,
    token
  }),
  [authentication.loginError]: (authState, payload) => ({
    ...authState,
    loggingIn: false,
    loggedIn: false,
    loginError: payload,
    token: null
  }),
  [authentication.logout]: authState => ({
    ...authState,
    loggingOut: true
  }),
  [authentication.logoutSuccess]: authState => ({
    ...authState,
    loggingOut: false,
    loggedIn: false,
    token: null
  }),
  // Logout of server failed. Logout of client. The error
  // should be reported in middleware.
  [authentication.logoutError]: authState => ({
    ...authState,
    loggingOut: false,
    loggedIn: false,
    token: null
  })
}, { token: null, loggedIn: false });
