/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import config from 'config';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';
import configShim from 'client/lib/shimConfig';

const initializePlugins = () => {
  const plugins = [];
  /**
   * When running webpack dev server, you don't want to hash
   * file output.
   */
  let outputCssFilename;
  let outputChunkFilename;
  if (config.get('wds')) {
    outputCssFilename = 'bundle.css';
    outputChunkFilename = '[name].bundle.js';
  } else {
    outputCssFilename = 'bundle-[hash].css';
    outputChunkFilename = '[name].bundle-[hash].js';
    plugins.push(
      new AssetsPlugin({
        path: path.join(__dirname, '..', 'dist'),
        prettyPrint: true
      })
    );
  }
  if (config.get('wds')) {
    plugins.push(new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: outputChunkFilename }));
  } else {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
  }

  plugins.push(
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new ExtractTextPlugin({
        filename: outputCssFilename,
        disable: false,
        allChunks: true
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin()
  );
  return plugins;
};

// See https://github.com/lorenwest/node-config/wiki/Webpack-Usage
fs.writeFileSync(path.resolve(__dirname, '..', 'dist/assets/config.js'), configShim(config));

module.exports = {
  devtool: 'eval',
  target: 'web',
  entry: {
    app: [
      `webpack-dev-server/client?http://localhost:${config.get('port')}/`,
      'babel-polyfill',
      path.join(__dirname, '..', 'src/client/index.jsx')
    ],
    vendor: [
      'react',
      'redux'
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'dist/assets'),
    publicPath: '/assets',
    filename: config.get('wds') ? '[name].bundle.js' : '[name].bundle.[hash:12].min.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?modules', 'sass-loader']
        })
      },
      {
        test: /\.woff(2)?(\?[a-z0-9]+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      }, {
        test: /\.(ttf|eot|svg)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/images&name=images/[path][name].[ext]', {
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 7
            },
            pngquant: {
              quality: '75-90',
              speed: 3
            }
          }
        }],
        exclude: /node_modules/,
        include: path.resolve(__dirname, '..', 'src')
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.scss'],

    modules: [
      'node_modules'
    ],

    // Whenever someone does import 'react', resolve the one in the node_modules
    // at the top level, just in case a dependency also has react in its node_modules,
    // we don't want to be running to versions of react!!!
    alias: {
      react: path.join(__dirname, '..', 'node_modules/react'),
      config: path.resolve(__dirname, '..', 'dist/assets/config.js')
    }
  },
  node: {
    fs: 'empty'
  },
  plugins: initializePlugins()
};

/* eslint-enable import/no-extraneous-dependencies */
