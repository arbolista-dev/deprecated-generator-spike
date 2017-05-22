import 'server/lib/ignoreStyles';
import express from 'express';
import os from 'os';
import config from 'config';
// eslint-disable-next-line import/no-unresolved
import webpackAssets from '../webpack-assets.json';
import configureApp from './configureApp';

const app = express();
configureApp(app, webpackAssets);

app.listen(config.get('port'), () => {
  console.info(`App is now running on ${os.hostname()}:${config.get('port')}`);
});
