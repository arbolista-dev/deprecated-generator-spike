import { By } from 'selenium-webdriver';
import until from 'selenium-webdriver/lib/until';
import { getDriver } from 'tests/integration/driver';

export async function expectLoginRouteRendered(wait = 2500) {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.id('Login')), wait);
}

export async function expectFooterText(expectedText, wait = 2500) {
  const driver = getDriver();
  await driver.wait(until.elementLocated(By.css('footer')),
    wait, 'expectFooterText - footer not found.');
  const footer = await driver.findElement(By.css('footer'));
  await driver.wait(async () => {
    const actualText = await footer.getText();
    return actualText === expectedText;
  }, wait, `expectFooterText - text did not match '${expectedText}'`);
}
