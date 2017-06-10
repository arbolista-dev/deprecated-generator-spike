import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import path from 'path';
import os from 'os';
import { assertFixtureMatch } from 'testUtils';
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
      .inDir(path.join(os.tmpdir(), 'tmp'))
      .withOptions({
        filename: 'index',
        reducerPath: 'something',
        includeTests: 1
      });
  });
  after(() => {
    Reducer.prototype._promptReducerActions = _promptReducerActions;
  });

  it('copies the template directory', async () => {
    assert.file([
      'src/shared/redux/reducers/something/index.js',
      'src/shared/redux/reducers/something/something.test.js'
    ]);

    await Promise.all([
      'src/shared/redux/reducers/something/something.test.js',
      'src/shared/redux/reducers/something/index.js'
    ].map(filepath => assertFixtureMatch(filepath, path.resolve(__dirname, 'fixtures/tc1', filepath))));
  });
});
