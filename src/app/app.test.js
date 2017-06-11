import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import os from 'os';
import path from 'path';
import App from './index';

describe('spike:app', () => {
  beforeEach(async () => {
    const runner = helpers.run(App)
      .inDir(path.join(os.tmpdir(), 'tmp'));

    await runner.then();
  });

  it('copies the template directory', () => {
    assert.file([
      'webpack/config.babel.js'
    ]);

    assert.file([
      '.babelrc',
      'test.js',
      'package.json'
    ]);

    assert.file([
      'src/server/index.js',
      'src/server/views/index.ejs',
      'src/server/storageEngine/index.js',
      'src/server/lib/ignoreStyles.js'
    ]);
    assert.file([
      'src/client/index.jsx',
      'src/client/storageEngine/index.js',
      'src/client/lib/config.shim.js'
    ]);
    assert.file([
      'src/shared/routes/index.jsx',
      'src/shared/redux/createStore.js',
      'src/shared/layout/index.jsx',
      'src/shared/assets/css/main.scss',
      'src/shared/api/index.js'
    ]);
  });
});
