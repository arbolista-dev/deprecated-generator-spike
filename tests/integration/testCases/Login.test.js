import * as pages from 'tests/integration/pages';

describe('Login page', () => {
  context('when logged in', () => {
    beforeEach(async () => {
      const reduxCookie = JSON.stringify({
        authentication: { token: '1234567890', loggedIn: true, loggingIn: false, loginError: null, loggingOut: false },
        currentUser: { attributes: { email: 'Bob@example.com', username: 'Bob' } }
      });
      await pages.Login.open(undefined, [{ name: 'redux', value: reduxCookie }]);
    });

    it('redirects to Home page when not logged in', async () => {
      await pages.Home.waitForUrl();
      await pages.Home.validations.expectHomeRouteRendered();
    });
  });

  context('when not logged in', () => {
    beforeEach(async () => {
      await pages.Login.open();
    });

    it('renders without issue', async () => {
      await pages.Login.validations.expectLoginRouteRendered();
    });

    it('can logout', async () => {
      await pages.Login.validations.expectLoginRouteRendered();
      await pages.Login.actions.login();
      await pages.Home.waitForUrl();
      await pages.Home.validations.expectHomeRouteRendered();
    });
  });
});
