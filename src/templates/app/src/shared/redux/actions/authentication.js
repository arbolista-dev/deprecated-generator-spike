import { createAction } from 'redux-act';

export const login = createAction('Initiate call to log user in.');
export const loginSuccess = createAction('Called when user has been successfully logged in.');
export const loginError = createAction('Error logging the user in.');

export const logout = createAction('Called when user has been successfully logged out.');
export const logoutSuccess = createAction('Called when user has been successfully logged out from server.');
export const logoutError = createAction('Error logging user out from server.');
