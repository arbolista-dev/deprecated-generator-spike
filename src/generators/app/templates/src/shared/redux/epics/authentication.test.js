import { expect } from 'chai';
import { ActionsObservable } from 'redux-observable';
import { TestScheduler } from 'rxjs';
import actions from 'shared/redux/actions';
import authEpics from './authentication';

const [loginEpic, logoutEpic] = authEpics;

describe('login', () => {
  it('returns token and user attributes', () => {
    const user = { id: 123, username: 'skid' };
    const token = '1234567890';

    const loginData = {
      username: 'johnson',
      password: 'password'
    };

    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).to.deep.equal(expected);
    });

    const action$ = new ActionsObservable(
      testScheduler.createHotObservable('(a|)', {
        a: actions.authentication.login(loginData)
      })
    );

    const response$ = testScheduler.createColdObservable('-a|', {
      a: { data: { user, token } }
    });
    const test$ = loginEpic(action$, undefined, (payload) => {
      expect(payload).to.deep.equal(loginData);
      return response$;
    });
    testScheduler.expectObservable(test$).toBe('-a|', {
      a: actions.authentication.loginSuccess({ user, token })
    });
    testScheduler.flush();
  });

  it('throws error on failure', () => {
    const message = 'Woops';
    const loginData = {
      username: 'johnson',
      password: 'password'
    };
    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).to.deep.equal(expected);
    });

    const action$ = new ActionsObservable(
      testScheduler.createHotObservable('(a|)', {
        a: actions.authentication.login(loginData)
      })
    );

    const response$ = testScheduler.createColdObservable('-#', null, { message });
    const test$ = loginEpic(action$, undefined, (payload) => {
      expect(payload).to.deep.equal(loginData);
      return response$;
    });
    testScheduler.expectObservable(test$).toBe('-(a|)', {
      a: actions.authentication.loginError({ message })
    });
    testScheduler.flush();
  });
});

describe('logout', () => {
  it('sets token and user attributes', () => {
    const token = '1234567890';

    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).to.deep.equal(expected);
    });

    const action$ = new ActionsObservable(
      testScheduler.createHotObservable('(a|)', {
        a: actions.authentication.logout()
      })
    );

    const response$ = testScheduler.createColdObservable('-a|', {
      a: { data: undefined }
    });
    const mockStore = { getState: () => ({ authentication: { token } }) };
    const test$ = logoutEpic(action$, mockStore, (payload) => {
      expect(payload).to.equal(token);
      return response$;
    });
    testScheduler.expectObservable(test$).toBe('-a|', {
      a: actions.authentication.logoutSuccess()
    });
    testScheduler.flush();
  });

  it('throws error on failure', () => {
    const token = '1234567890';
    const message = 'Woops!';

    const testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).to.deep.equal(expected);
    });

    const action$ = new ActionsObservable(
      testScheduler.createHotObservable('(a|)', {
        a: actions.authentication.logout()
      })
    );

    const response$ = testScheduler.createColdObservable('-#', null, { message });
    const mockStore = { getState: () => ({ authentication: { token } }) };
    const test$ = logoutEpic(action$, mockStore, (payload) => {
      expect(payload).to.equal(token);
      return response$;
    });
    testScheduler.expectObservable(test$).toBe('-(a|)', {
      a: actions.authentication.logoutError({ message })
    });
    testScheduler.flush();
  });
});
