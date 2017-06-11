import { expect } from 'chai';
import { By } from 'selenium-webdriver';
import until from 'selenium-webdriver/lib/until';
import { getDriver } from 'tests/integration/driver';

export async function expectHomeRouteRendered(wait = 5000) {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id('Home')), wait);
}

export async function expectUsername(username, wait = 2500) {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id('Welcome')), wait);
  const welcome = await driver.findElement(By.id('Welcome'));
  const message = await welcome.getText();
  expect(message.trim()).to.contain(`Welcome ${username}`);
}
