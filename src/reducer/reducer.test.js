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
        reducerPath: 'something',
        includeTests: 1
      });
  });
  after(() => {
    Reducer.prototype._promptReducerActions = _promptReducerActions;
  });

  it('copies the template directory', () => {
    assert.file([
      'src/shared/redux/reducers/something/index.js',
      'src/shared/redux/reducers/something/something.test.js'
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

    const test =
`import actions from 'shared/redux/actions';
import { expect } from 'chai';
import something from './index';

describe('something reducer', () => {
  describe('actions.user.juggle', () => {
    it('correctly updates state', () => {
      const originalState = {
        // insert original state here
      };
      const result = something(originalState, actions.user.juggle({
        // insert payload here
      }));
      expect(result).to.deep.equal({
        // assert new expected state
      });
      // assert immutability
      expect(originalState).to.deep.equal({
        // insert original state here
      });
    });
  });
  describe('actions.authentication.login', () => {
    it('correctly updates state', () => {
      const originalState = {
        // insert original state here
      };
      const result = something(originalState, actions.authentication.login({
        // insert payload here
      }));
      expect(result).to.deep.equal({
        // assert new expected state
      });
      // assert immutability
      expect(originalState).to.deep.equal({
        // insert original state here
      });
    });
  });
  
});`;

    assert.fileContent([
      ['src/shared/redux/reducers/something/index.js', imports],
      ['src/shared/redux/reducers/something/index.js', reducer],
      ['src/shared/redux/reducers/something/something.test.js', test]
    ]);
  });
});
