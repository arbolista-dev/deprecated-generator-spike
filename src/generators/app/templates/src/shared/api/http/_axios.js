import Axios from 'axios';
import Rx from 'rxjs';
import config from 'config';

// This will return Axios responses as an observable.
export default options => Rx.Observable.from(Axios.create({
  baseURL: config.get('api.base')
})(options));
