import actions from 'shared/redux/actions';
import { expect } from 'chai';
import authReducer from './authentication';

describe('authentication reducer', ()=>{

  context('not logged in', ()=>{
    const originalState = {
      token: null,
      loggedIn: false
    };
    it('can tracks logging in', ()=>{
      const result = authReducer(originalState, actions.authentication.login({
        username: 'yada',
        password: 'password'
      }));
      expect(result).to.deep.equal({
        token: null,
        loggedIn: false,
        loggingIn: true,
        loginError: null
      });
      expect(originalState).to.deep.equal({
        token: null,
        loggedIn: false
      });
    });
    it('can tracks when logged in successfully', ()=>{
      const result = authReducer(originalState, actions.authentication.loginSuccess({
        token: '123456',
        user: {
          username: 'yada',
          id: 4
        }
      }));
      expect(result).to.deep.equal({
        token: '123456',
        loggedIn: true,
        loggingIn: false,
        loginError: null
      });
      expect(originalState).to.deep.equal({
        token: null,
        loggedIn: false
      });
    });
    it('can tracks when login error', ()=>{
      const result = authReducer(originalState, actions.authentication.loginError({
        message: 'You messed up.'
      }));
      expect(result).to.deep.equal({
        token: null,
        loggedIn: false,
        loggingIn: false,
        loginError: {message: 'You messed up.'}
      });
      expect(originalState).to.deep.equal({
        token: null,
        loggedIn: false
      });
    });
  });
  context('when logged out', ()=>{
    const originalState = {
      token: '123456',
      loggedIn: true
    };

    it('can tracks logging out', ()=>{
      const result = authReducer(originalState, actions.authentication.logout('123456'));
      expect(result).to.deep.equal({
        token: '123456',
        loggedIn: true,
        loggingOut: true
      });
      expect(originalState).to.deep.equal({
        token: '123456',
        loggedIn: true
      });
    });
    it('can tracks when logged out successfully', ()=>{
      const result = authReducer(originalState, actions.authentication.logoutSuccess());
      expect(result).to.deep.equal({
        token: null,
        loggedIn: false,
        loggingOut: false
      });
      expect(originalState).to.deep.equal({
        token: '123456',
        loggedIn: true
      });
    });
    it('can tracks when logout error', ()=>{
      const result = authReducer(originalState, actions.authentication.logoutError('oops!'));
      expect(result).to.deep.equal({
        token: null,
        loggedIn: false,
        loggingOut: false
      });
      expect(originalState).to.deep.equal({
        token: '123456',
        loggedIn: true
      });
    });

  });

});
