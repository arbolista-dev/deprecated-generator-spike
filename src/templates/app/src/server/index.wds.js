/* eslint-disable import/no-extraneous-dependencies */
import 'shared/lib/ignoreStyles';
import path from 'path';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from 'config';
import webpackConfig from 'webpack/config.babel';
import configureApp from './configureApp';

const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  contentBase: path.join(__dirname, '../..', 'dist/assets'),
  publicPath: '/assets',
  // hot: true,
  stats: { colors: true },
  port: config.get('port')
});
const { app } = devServer;

let initialCompile = true;
compiler.plugin('done', () => {
  if (initialCompile) {
    initialCompile = false;

    const assetsConfigs = {
      app: {
        js: '/assets/app.bundle.js',
        css: '/assets/bundle.css'
      },
      vendor: {
        js: '/assets/vendor.bundle.js'
      }
    };
    configureApp(app, assetsConfigs);

    devServer.listen(config.get('port'), () => {
      console.info(`App is now running on http://localhost:${config.get('port')}`);
    });
  }
});
/* eslint-enable import/no-extraneous-dependencies */
