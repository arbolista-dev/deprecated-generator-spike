import * as pages from 'tests/integration/pages';

describe('Translations', () => {
  context('when lng querystring set to "es"', () => {
    beforeEach(async () => {
      await pages.Login.open({
        lng: 'es'
      });
    });

    it('renders footer in spanish on login page', async () => {
      await pages.Login.waitForUrl();
      await pages.Login.validations.expectLoginRouteRendered();
      await pages.Login.validations.expectFooterText('todos los derechos reservados');
    });
  });
});
