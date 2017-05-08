import config from 'config';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import AssetsPlugin from 'assets-webpack-plugin';

const plugins = config.get('webpack.uglify')
    ? [new webpack.optimize.UglifyJsPlugin()]
    : [
      new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: outputChunkFilename })
    ];

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

/**
 * When running webpack dev server, you don't want to hash
 * file output.
 */
let outputJsFilename;
let outputCss;
let outputChunkFilename;
if (config.get('wds')) {
  outputJsFilename = 'bundle.min.js';
  outputCssFilename = 'bundle.css';
  outputChunkFilename = '[name].bundle.js';
} else {
  outputJsFilename = 'bundle.[hash:12].min.js';
  outputCssFilename = 'bundle-[hash].css';
  outputChunkFilename = '[name].bundle-[hash].js';
  plugins.push(
    new AssetsPlugin({
      path: path.join(__dirname, '..', 'dist'),
      prettyPrint: true
    })
  );
}

module.exports = {
  devtool: 'eval',
  devServer: {
    historyApiFallback: true,
    contentBase: `${__dirname}/../src`,
    hot: true
  },
  entry: {
    app: [
      'babel-polyfill',
      path.join(__dirname, '..', 'src/client/index.js')
    ],
    vendor: [
      'react',
      'redux'
    ]
  },
  output: {
    path: path.join(__dirname, '..', 'dist'),
    publicPath: '/assets',
    filename: outputJsFilename
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
      react: path.join(__dirname, 'node_modules/react')
    }
  },
  plugins
};
