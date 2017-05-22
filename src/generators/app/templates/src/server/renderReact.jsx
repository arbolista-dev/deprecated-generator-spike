import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import Layout from 'shared/layout';

/**
 * renderReact will render the React application to a string
 * based on the current route and cookies or pass redirect
 * information if react-router redirected.
 */
export default function renderReact(i18n, location, context = {}, store) {
  return (
    ReactDOMServer.renderToString(
      <Provider store={store}>
        <StaticRouter location={location} context={context}>
          <Layout i18n={i18n} />
        </StaticRouter>
      </Provider>
    )
  );
}
