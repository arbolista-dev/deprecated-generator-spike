import Rx from 'rxjs';
import './authentication';

// eslint-disable-next-line import/prefer-default-export
export function resolve(payload) {
  return Rx.Observable.from(Promise.resolve(payload));
}
