import { combineEpics } from 'redux-observable';
import authentication from './authentication';

export default combineEpics(
  ...authentication,
);
