import config from 'config';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { Provider } from 'react-redux';
import Layout from 'shared/layout';
import { createEngine } from './storageEngine';
import createStore from 'shared/redux/createStore';
import i18n from './i18n';
/**
 * renderReact will render the React application to a string
 * based on the current route and cookies or pass redirect
 * information if react-router redirected.
 */
export default function renderReact(req) {
  const storageEngine = createEngine(config.get('storage.key'), req);
  const store = createStore(storageEngine);
  const redirect = {};
  const renderedContent = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={redirect}>
        <Layout i18n={i18n} />
      </StaticRouter>
    </Provider>
  );

  // Redirects will add a url to context.
  // For more details, see:
  // https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/server-rendering.md
  if (redirect.url) {
    redirect.status = redirect.status || 301;
    return { redirect };
  }
  return { renderedContent };
}
