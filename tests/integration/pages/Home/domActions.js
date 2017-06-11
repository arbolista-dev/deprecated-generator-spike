import { By } from 'selenium-webdriver';
import until from 'selenium-webdriver/lib/until';
import { getDriver } from 'tests/integration/driver';

// eslint-disable-next-line import/prefer-default-export
export async function logout(wait = 2500) {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id('LogoutButton')), wait);
  const logoutButton = await driver.findElement(By.id('LogoutButton'));
  return logoutButton.click();
}
