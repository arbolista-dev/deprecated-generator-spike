/* eslint-disable import/prefer-default-export */
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import createHistory from 'history/createMemoryHistory';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import logger from 'morgan';
import config from 'config';
import createStore from 'shared/redux/createStore';
import App from 'shared/App';
import { createEngine } from './storageEngine';

/**
 * renderReact will render the React application to a string
 * based on the current route and cookies.
 */
function renderReact(req) {
  const history = createHistory({
    initialEntries: [req.url]
  });

  const storageEngine = createEngine(config.get('storage.key'), req);
  const store = createStore(history, storageEngine);
  const props = {
    history,
    store
  };
  const app = React.createElement(App, props);
  return ReactDOMServer.renderToString(app);
}

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
      content = renderReact(req);
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
 * config will accept an instance of an express application
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
/* eslint-enable import/prefer-default-export */
