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
        filename: 'yada'
      });
  });
  after(() => {
    Epics.prototype._promptEpicsData = _promptEpicsData;
  });

  it('copies the template directory', () => {
    assert.file([
      'src/shared/redux/epics/yada.js'
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

    assert.fileContent([
      ['src/shared/redux/epics/yada.js', imports],
      ['src/shared/redux/epics/yada.js', loginEpic],
      ['src/shared/redux/epics/yada.js', logoutEpic],
      ['src/shared/redux/epics/yada.js', juggleEpic],
      ['src/shared/redux/epics/yada.js', epicsExport]
    ]);
  });
});
