import * as storage from 'redux-storage';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import logger from 'morgan';
import config from 'config';
import createStore from 'shared/redux/createStore';
import i18n from './lib/i18n';
import { createEngine } from './storageEngine';
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
    const context = {};
    if (config.get('isomorphic')) {
      const storageEngine = createEngine(config.get('storage.key'), req);
      const store = createStore(storageEngine);
      storage.createLoader(storageEngine)(store)
        .then(() => {
          content = renderReact(req.i18n, req.originalUrl, context, store);
          if (context.url) {
            res.redirect(context.status, context.url);
          } else {
            res.status(200).render('index', {
              content,
              config,
              assetConfigs
            });
          }
        });
    } else {
      res.set('Content-Type', 'text/html');
      res.render('index', {
        content,
        config,
        assetConfigs
      });
    }
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
  const staticPath = path.resolve(__dirname, '..', 'shared/assets');
  app.use('/assets', express.static(staticPath));

  app.use(i18n);

  app.use(logger('dev'));

  // view engine set up
  app.set('view engine', 'ejs');
  app.set('views', path.resolve(__dirname, 'views'));
  const requestHanlder = createRequestHandler(assetConfigs);
  app.get(/^(?!(\/assets|\/favico|\/robots))/, requestHanlder);
}
