import * as pages from 'tests/integration/pages';

describe('Home page', () => {
  context('when not logged in', () => {
    beforeEach(async () => {
      // no auth cookies.
      await pages.Home.open();
    });

    it('redirects to login page when not logged in', async () => {
      await pages.Login.waitForUrl();
      await pages.Login.validations.expectLoginRouteRendered();
    });
  });

  context('when logged in', () => {
    beforeEach(async () => {
      const reduxCookie = JSON.stringify({
        authentication: { token: '1234567890', loggedIn: true, loggingIn: false, loginError: null, loggingOut: false },
        currentUser: { attributes: { email: 'Bob@example.com', username: 'Bob' } }
      });
      await pages.Home.open(undefined, [{ name: 'redux', value: reduxCookie }]);
    });

    it('shows username when logged in', async () => {
      await pages.Home.validations.expectHomeRouteRendered();
      await pages.Home.validations.expectUsername('Bob');
    });

    it('can logout', async () => {
      await pages.Home.validations.expectHomeRouteRendered();
      await pages.Home.actions.logout();
      await pages.Login.waitForUrl();
      await pages.Login.validations.expectLoginRouteRendered();
    });
  });
});
