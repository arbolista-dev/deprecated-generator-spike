import { combineEpics } from 'redux-observable';
export * as authentication from './authentication';

export default combineEpics(
  authentication,
);
