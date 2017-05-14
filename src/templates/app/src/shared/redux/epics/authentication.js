import api from 'shared/api';
import Rx from 'rxjs';
import actions from 'shared/redux/actions';

const authenticationApi = api().authentication;

const login = (action$, _store, exec=authenticationApi.login) =>
  action$.ofType(actions.authentication.login.getType())
    .mergeMap(action => exec(action.payload)
          .map(response => actions.authentication.loginSuccess(response.data))
          .catch(error => Rx.Observable.of(actions.authentication.loginError(error))));

const logout = (action$, store, exec=authenticationApi.logout) =>
  action$.ofType(actions.authentication.logout.getType())
    .mergeMap((_action) => {
      const { authentication: { token } } = store.getState();
      return exec(token)
          .map(_response => actions.authentication.logoutSuccess())
          .catch(error =>Rx.Observable.of(actions.authentication.logoutError(error)));
    });

export default [login, logout];
