import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import config from 'config';
import webpackConfig from 'webpack/config';
import 'ignore-styles';
import configureApp from './configureApp';

const compiler = webpack(webpackConfig);
const devServer = new WebpackDevServer(compiler, {
  contentBase: `${__dirname}/../../dist`,
  publicPath: '/assets/',
  stats: { colors: true }
});
const { app } = devServer;

let initialCompile = true;
compiler.plugin('done', () => {
  if (initialCompile) {
    initialCompile = false;

    const assetsConfigs = {
      app: {
        js: '/assets/app.js',
        css: '/assets/app.css'
      },
      vendor: {
        js: '/assets/vendor.js'
      }
    };
    configureApp(app, assetsConfigs);

    devServer.listen(config.get('port'), () => {
      console.info(`App is now running on http://localhost:${config.get('port')}`);
    });
  }
});
