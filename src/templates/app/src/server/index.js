import express from 'express';
import os from 'os';
import config from 'config';
import 'ignore-styles';
// eslint-disable-next-line import/no-unresolved
import assetConfigs from '../../assetConfigs.json';
import configureApp from './configureApp';

const app = express();
configureApp(app, assetConfigs);

app.listen(config.get('port'), () => {
  console.info(`App is now running on ${os.hostname()}:${config.get('port')}`);
});
