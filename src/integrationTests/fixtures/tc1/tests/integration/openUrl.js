import config from 'config';
import Url from 'url';
import webdriver from 'selenium-webdriver';
import until from 'selenium-webdriver/lib/until';

function createSeleniumInstance(browser) {
  return new webdriver.Builder()
    .forBrowser(browser)
    .build();
}

/**
* This function opens a URL on browser and returns the driver.
* @param {String} pathname Pathname of url
* @param {Object} Query Query parameters to add to URL.
* @returns {Promise} Promise resolving to Selenium driver instance.
*/
export default async function openUrl(pathname, query) {
  const url = Url.parse(config.get('integrationTests.origin'));
  url.pathname = pathname;
  url.query = query;
  const driver = await createSeleniumInstance();
  await driver.get(Url.format(url));
  return driver;
}
