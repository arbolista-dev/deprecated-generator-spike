import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import logger from 'morgan';
import config from 'config';
import renderReact from './renderReact';

/**
 * handleError will return an error message (different depending on
 * developmentErrors setting) to the client.
 */
function handleErr(res, err) {
  console.error(err);
  res.set('Content-Type', 'text/html');
  let content = '<div class="alert alert-danger">Server Error</div>';
  if (config.get('server.renderErrorStack')) {
    content = JSON.stringify(err, null, 2);
  }
  res.render('error', {
    content
  });
}

/**
 * createRequestHandler will create an express response handler which will
 * render index.html view for non-static request to server.
 */
const createRequestHandler = assetConfigs => (req, res) => {
  let content = '';
  try {
    if (config.get('isomorphic')) {
      const {
        renderedContent,
        redirect
      } = renderReact(req);
      if (redirect) {
        const { url, status } = redirect;
        res.redirect(status, url);
        return;
      }
      content = renderedContent;
    }
    res.set('Content-Type', 'text/html');
    res.render('index', {
      content,
      config,
      assetConfigs
    });
  } catch (err) {
    handleErr(res, err);
  }
};

/**
 * configApp will accept an instance of an express application
 * and configure it for necessary parsing, logging, and
 * request handling.
 */
export default function configureApp(app, assetConfigs) {
  app.use(cookieParser());
  // serve public static files.a
  const staticPath = path.resolve(__dirname, '../..', 'dist/assets');
  app.use('/assets', express.static(staticPath));

  app.use(logger('dev'));

  // view engine set up
  app.set('view engine', 'ejs');
  app.set('views', path.resolve(__dirname, 'views'));
  const requestHanlder = createRequestHandler(assetConfigs);
  app.get(/^(?!(\/assets|\/favico|\/robots))/, requestHanlder);
}
