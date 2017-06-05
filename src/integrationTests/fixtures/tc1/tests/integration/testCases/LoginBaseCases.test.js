import config from 'config';
import openUrl from 'tests/integration/openUrl';
import { expect } from 'chai';
import pages from 'tests/integration/pages';

// use driver and page actions and validations: https://seleniumhq.github.io/selenium/docs/api/javascript/
describe('Login base cases', () => {
  let driver;
  beforeEach(async () => {
    driver = await pages.Login.open();
  });

  afterEach(async () => {
    await driver.close();
  });

  it('laughs', async () => {
    // TODO
  });
  it('cries', async () => {
    // TODO
  });
  
});
