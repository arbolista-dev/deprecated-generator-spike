import { createReducer } from 'redux-act';
import { Map } from 'immutable';
import { authentication } from 'shared/redux/actions';

export default createReduce({
  [authentication.login]: (authentication, _payload) => authState.merge({
    loggingIn: true,
    loginError: null,
    token: null
  }),
  [authentication.loginSuccess]: (authState, { token }) => authState.merge({
    loggingIn: false,
    loggedIn: true,
    loginError: null,
    token
  }),
  [authentication.loginError]: (authState, payload) => authState.merge({
    loggingIn: false,
    loggedIn: true,
    loginError: payload,
    token: null
  }),
  [authentication.logout]: authState => authState.merge({
    loggingOut: true
  }),
  [authentication.loginSuccess]: authState => authState.merge({
    loggingOut: false,
    loggedIn: false,
    token: null
  }),
  [authentication.loginError]: authState =>
    // Swallow the error here.
     authState.merge({
       loggingOut: false,
       loggedIn: false,
       token: null
     })

}, Map({ token: null }));
