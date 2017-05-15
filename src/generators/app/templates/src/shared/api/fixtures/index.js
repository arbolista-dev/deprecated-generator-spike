import Rx from 'rxjs';
import * as authentication from './authentication';

export function resolve(payload) {
  return Rx.Observable.from(Promise.resolve(payload));
}

export default {
  authentication
};
