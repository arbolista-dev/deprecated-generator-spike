import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import Reducer from './index';

describe('spike:reducer', () => {
  const { _promptReducerActions } = Reducer.prototype;
  before(() => {
    Reducer.prototype._promptReducerActions = async function _promptReducerActionsStub() {
      this.actionPaths = [
        'user.juggle',
        'authentication.login'
      ];
      this.values = [
        { name: 'token', default: 'null' },
        { name: 'username', default: '\'User\'' }
      ];
    };
  });
  beforeEach(async () => {
    await helpers.run(Reducer)
      .withOptions({
        filename: 'index',
        reducerPath: 'something'
      });
  });
  after(() => {
    Reducer.prototype._promptReducerActions = _promptReducerActions;
  });

  it('copies the template directory', () => {
    assert.file([
      'src/shared/redux/reducers/something/index.js'
    ]);
    const imports =
`import { createReducer } from 'redux-act';
import actions from 'shared/redux/actions';`;

    const reducer =
`export default createReducer({
  [actions.user.juggle.getType()]: (state, payload) => ({
    ...state,
  }),
  [actions.authentication.login.getType()]: (state, payload) => ({
    ...state,
  }),
  
}, { 
  token: null,
  username: 'User',
   
});`;

    assert.fileContent([
      ['src/shared/redux/reducers/something/index.js', imports],
      ['src/shared/redux/reducers/something/index.js', reducer]
    ]);
  });
});
