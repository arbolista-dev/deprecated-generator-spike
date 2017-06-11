import helpers from 'yeoman-test';
import path from 'path';
import os from 'os';
import assert from 'yeoman-assert';
import Actions from './index';

describe('spike:actions', () => {
  const { _promptActionData } = Actions.prototype;
  before(() => {
    Actions.prototype._promptActionData = async function _promptActionDataStub() {
      this.actions = [
        { name: 'login', description: 'Login to server' },
        { name: 'logout', description: 'Logout of server' }
      ];
    };
  });
  beforeEach(async () => {
    await helpers.run(Actions)
      .inDir(path.join(os.tmpdir(), 'tmp'))
      .withOptions({
        filename: 'yada'
      });
  });
  after(() => {
    Actions.prototype._promptActionData = _promptActionData;
  });

  it('copies the template directory', () => {
    assert.file([
      'src/shared/redux/actions/yada.js'
    ]);
    assert.fileContent([
      ['src/shared/redux/actions/yada.js', /import { createAction } from 'redux-act'/],
      ['src/shared/redux/actions/yada.js', /export const login = createAction\('Login to server'\);/],
      ['src/shared/redux/actions/yada.js', /export const logout = createAction\('Logout of server'\);/]
    ]);
  });
});
