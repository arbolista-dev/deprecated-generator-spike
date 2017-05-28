import helpers from 'yeoman-test';
import assert from 'yeoman-assert';
import Actions from './index';

describe('spike:actions', () => {
  beforeEach(async () => {
    await helpers.run(App)
      withOptions({
        filename: 'yada'
      });
  });

  it('copies the template directory', () => {
    assert.file([
      'src/redux/actions/yada.js'
    ]);

    
  });
});
