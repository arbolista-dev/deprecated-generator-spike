import { expect } from 'chai';
import { ActionsObservable } from 'redux-observable';
import { TestScheduler } from 'rxjs';
import actions from 'shared/redux/actions';
import yada from './yada';

const [
  login, logout, juggle, 
] = yada;

describe('yada', () => {

  describe('login', () => {
    it('returns token and user attributes', () => {
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).to.deep.equal(expected);
      });

      const actionPayload = {
        // TODO
      };
      const action$ = new ActionsObservable(
        testScheduler.createHotObservable('(a|)', {
          a: actions.authentication.login(actionPayload)
        })
      );

      const responseData = {
        // TODO
      };
      const response$ = testScheduler.createColdObservable('-a|', {
        a: responseData
      });
      const test$ = login(action$, undefined, (payload) => {
        expect(payload).to.deep.equal(actionPayload);
        return response$;
      });
      testScheduler.expectObservable(test$).toBe('-a|', {
        a: actions.authentication.loginSuccess(responseData)
      });
      testScheduler.flush();
    });

    it('throws error on failure', () => {
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).to.deep.equal(expected);
      });

      const actionPayload = {
        // TODO
      };
      const action$ = new ActionsObservable(
        testScheduler.createHotObservable('(a|)', {
          a: actions.authentication.login(actionPayload)
        })
      );

      const errorMessage = undefined; // TODO
      const response$ = testScheduler.createColdObservable('-#', null, errorMessage);
      const test$ = loginEpic(action$, undefined, (payload) => {
        expect(payload).to.deep.equal(actionPayload);
        return response$;
      });
      testScheduler.expectObservable(test$).toBe('-(a|)', {
        a: actions.authentication.loginError(errorMessage)
      });
      testScheduler.flush();
    });
  });
  describe('logout', () => {
    it('returns token and user attributes', () => {
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).to.deep.equal(expected);
      });

      const actionPayload = {
        // TODO
      };
      const action$ = new ActionsObservable(
        testScheduler.createHotObservable('(a|)', {
          a: actions.authentication.logout(actionPayload)
        })
      );

      const responseData = {
        // TODO
      };
      const response$ = testScheduler.createColdObservable('-a|', {
        a: responseData
      });
      const test$ = logout(action$, undefined, (payload) => {
        expect(payload).to.deep.equal(actionPayload);
        return response$;
      });
      testScheduler.expectObservable(test$).toBe('-a|', {
        a: actions.authentication.logoutSuccess(responseData)
      });
      testScheduler.flush();
    });

    it('throws error on failure', () => {
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).to.deep.equal(expected);
      });

      const actionPayload = {
        // TODO
      };
      const action$ = new ActionsObservable(
        testScheduler.createHotObservable('(a|)', {
          a: actions.authentication.logout(actionPayload)
        })
      );

      const errorMessage = undefined; // TODO
      const response$ = testScheduler.createColdObservable('-#', null, errorMessage);
      const test$ = loginEpic(action$, undefined, (payload) => {
        expect(payload).to.deep.equal(actionPayload);
        return response$;
      });
      testScheduler.expectObservable(test$).toBe('-(a|)', {
        a: actions.authentication.logoutError(errorMessage)
      });
      testScheduler.flush();
    });
  });
  describe('juggle', () => {
    
    it('properly implements Redux Observable interface', ()=>{
      const testScheduler = new TestScheduler((actual, expected) => {
        expect(actual).to.deep.equal(expected);
      });

      const actionPayload = {
        // TODO
      };
      const action$ = new ActionsObservable(
        testScheduler.createHotObservable('(a|)', {
          a: actions.user.juggle(actionPayload)
        })
      );

      // TODO implement RXJS behavior
      testScheduler.flush();
    });
  });
  
});
