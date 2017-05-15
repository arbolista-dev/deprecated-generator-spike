import { combineReducers } from 'redux';
import authentication from './authentication';
import currentUser from './currentUser';

export default combineReducers({
  authentication,
  currentUser
});
