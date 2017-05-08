import { createReducer } from 'redux-act';
import { Map } from 'immutable';
import { authentication } from 'shared/redux/actions';

export default createReducer({
  [authentication.loginSuccess]: (_currentUser, payload) => Map({ attributes: payload }),
  [authentication.logoutSuccess]: (_currentUser, _payload) => null,
  [authentication.logoutError]: (_currentUser, _payload) => null
}, null);
