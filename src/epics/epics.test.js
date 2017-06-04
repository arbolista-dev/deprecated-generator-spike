import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import Epics from './index';

describe('spike:epics', () => {
  const { _promptEpicsData } = Epics.prototype;
  before(() => {
    Epics.prototype._promptEpicsData = async function _promptEpicsDataStub() {
      this.epics = [
        { name: 'login', type: 'ajax', apiPath: 'authentication.login', actionPath: 'authentication.login', successActionPath: 'authentication.loginSuccess', errorActionPath: 'authentication.loginError' },
        { name: 'logout', type: 'ajax', apiPath: 'authentication.logout', actionPath: 'authentication.logout', successActionPath: 'authentication.logoutSuccess', errorActionPath: 'authentication.logoutError' },
        { name: 'juggle', type: 'other', actionPath: 'user.juggle' }
      ];
    };
  });
  beforeEach(async () => {
    await helpers.run(Epics)
      .withOptions({
        filename: 'yada',
        includeTests: 1
      });
  });
  after(() => {
    Epics.prototype._promptEpicsData = _promptEpicsData;
  });

  it('copies the template directory', () => {
    assert.file([
      'src/shared/redux/epics/yada.js',
      'src/shared/redux/epics/yada.test.js'
    ]);
    const imports =
`import Rx from 'rxjs';
import actions from 'shared/redux/actions';
import api from 'shared/api';`;
    const loginEpic =
`const login = (action$, _store, exec = api.authentication.login) =>
  action$.ofType(actions.authentication.login.getType())
    .mergeMap(action => exec(action.payload)
          .map(response => actions.authentication.loginSuccess(response))
          .catch(error => Rx.Observable.of(actions.authentication.loginError(error))));`;
    const logoutEpic =
`const logout = (action$, _store, exec = api.authentication.logout) =>
  action$.ofType(actions.authentication.logout.getType())
    .mergeMap(action => exec(action.payload)
          .map(response => actions.authentication.logoutSuccess(response))
          .catch(error => Rx.Observable.of(actions.authentication.logoutError(error))));`;
    const juggleEpic =
`const juggle = (action$, _store) =>
  action$.ofType(actions.user.juggle.getType())
    .mergeMap(action => {
      // Do stuff with your action here.
      // If you have another epic pattern you would like us to include,
      // feel free to open up an issue at https://github.com/arbolista-dev/generator-spike/issues
    });`;

    const epicsExport =
`export default [
  login,
  logout,
  juggle,
];`;

    const epicsTest =
`import { expect } from 'chai';
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
  
});`;

    assert.fileContent([
      ['src/shared/redux/epics/yada.js', imports],
      ['src/shared/redux/epics/yada.js', loginEpic],
      ['src/shared/redux/epics/yada.js', logoutEpic],
      ['src/shared/redux/epics/yada.js', juggleEpic],
      ['src/shared/redux/epics/yada.js', epicsExport],
      ['src/shared/redux/epics/yada.test.js', epicsTest]
    ]);
  });
});
