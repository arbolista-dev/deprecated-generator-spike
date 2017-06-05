describe('Home base cases', () => {
  let driver;
  beforeEach(async () => {
    driver = await pages.Home.open();
  });

  afterEach(async () => {
    await driver.close();
  });

  it('jumps', async () => {
    // TODO
  });
  it('dances', async () => {
    // TODO
  });
  
});
