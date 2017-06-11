import URL from 'url';
import { openUrl, getDriver } from 'tests/integration/driver';
import { _extend as extend } from 'util';

export default class Page {

  constructor(pathname, actions, validations) {
    extend(this, {
      pathname,
      actions,
      validations
    });
  }

  async open(query, cookies) {
    await openUrl(this.pathname, query, cookies);
  }

  async waitForUrl(wait = 2500) {
    const driver = getDriver();
    await driver.wait(async () => {
      let currentUrl = await driver.getCurrentUrl();
      currentUrl = URL.parse(currentUrl);
      return currentUrl.pathname === this.pathname;
    }, wait);
  }

}
