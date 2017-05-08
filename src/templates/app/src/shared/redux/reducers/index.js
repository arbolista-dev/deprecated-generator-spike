import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import * as authentication from './authentication';
import * as currentUser from './currentUser';

export default combineReducers({
  authentication,
  currentUser,
  router
});
