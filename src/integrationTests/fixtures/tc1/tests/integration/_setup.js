import webdriver from 'selenium-webdriver';
import {
  createSeleniumInstance,
  getDriver
} from './driver';

const isNoSuchSessionError = (err =>
  err instanceof webdriver.error.WebDriverError &&
    err.message.match('no such session')
);

beforeEach(async () => {
  await createSeleniumInstance();
});
afterEach(async () => {
  try {
    await getDriver().quit();
  } catch (err) {
    if (!isNoSuchSessionError(err)) throw err;
  }
});
