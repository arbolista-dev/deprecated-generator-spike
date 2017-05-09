import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import authentication from './authentication';
import currentUser from './currentUser';

export default combineReducers({
  authentication,
  currentUser,
  routing
});
