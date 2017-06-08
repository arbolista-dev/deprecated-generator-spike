import { By } from 'selenium-webdriver';
import until from 'selenium-webdriver/lib/until';
import { getDriver } from 'tests/integration/driver';

// eslint-disable-next-line import/prefer-default-export
export async function login(wait = 2500) {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id('LoginButton')), wait);
  const loginButton = await driver.findElement(By.id('LoginButton'));
  return loginButton.click();
}
