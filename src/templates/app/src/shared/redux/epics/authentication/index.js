import api from 'shared/api';
import Rx from 'rxjs';
import actions from 'shared/redux/actions';

const authenticationApi = api().authentication;

const login = (action$, _store) =>
  action$.ofType(actions.authentication.login.getType())
    .mergeMap(action => authenticationApi.login(action.payload)
          .map(response => actions.authentication.loginSuccess(response))
          .catch(error => Rx.Observable.of(actions.authentication.loginError(error))));

const logout = (action$, store) =>
  action$.ofType(actions.authentication.logout.getType())
    .mergeMap((_action) => {
      const { authentication: { token } } = store.getState();
      return authenticationApi.logout(token)
          .map(_response => actions.authentication.logoutSuccess())
          .catch(error => Rx.Observable.of(actions.authentication.logoutError(error)));
    });

export default [login, logout];
