import api from 'shared/api';
import {
  authentication as actions
} from 'shared/redux/actions';

const authenticationApi = api().authentication;

export const login = (action$, _store)=>
  action$.ofType(actions.login.getType())
    .mergeMap(action =>{
        authenticationApi.login(action.payload)
          .map(response => actions.loginSuccess(response))
          .catch(error => Observable.of(actions.loginError(error)))
      });

export const login = (action$, store) =>
  action$.ofType(actions.login.getType())
    .mergeMap(action =>{
        const {authentication: { token }} = store.getState();
        authenticationApi.logout(token)
          .map(response => actions.logoutSuccess())
          .catch(error => Observable.of(actions.logoutError(error)))
      });
