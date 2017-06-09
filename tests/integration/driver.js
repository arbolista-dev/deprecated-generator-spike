import webdriver from 'selenium-webdriver';
import config from 'config';
import Url from 'url';

let driver;

export async function createSeleniumInstance() {
  driver = await (new webdriver.Builder()
    .forBrowser(config.get('integrationTests.browser'))
    .build());
}

export const getDriver = (() => driver);

/**
* This function opens a URL on browser and returns the driver.
* @param {String} pathname Pathname of url
* @param {Object} query Query parameters to add to URL.
* @param {Array} cookies Cookies to set before opening page.
* @returns {Promise} Promise resolving to Selenium driver instance.
*/
export async function openUrl(pathname, query, cookies = []) {
  const url = Url.parse(config.get('integrationTests.origin'));
  if (cookies.length > 0) {
    url.pathname = '/login';
    await driver.get(Url.format(url));
    await Promise.all(cookies.map(cookie => driver.manage().addCookie(cookie)));
  }
  url.pathname = pathname;
  url.query = query;
  await driver.get(Url.format(url));
}
