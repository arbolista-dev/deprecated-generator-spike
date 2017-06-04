import { createReducer } from 'redux-act';
import actions from 'shared/redux/actions';

const { authentication } = actions;

export default createReducer({
  [authentication.loginSuccess]: (_currentUser, { user }) => ({ attributes: user })
}, null);
