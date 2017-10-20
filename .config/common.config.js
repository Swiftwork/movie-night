var path = require('path');
var extend = require('webpack-merge');
var webpack = require('webpack');
var DashboardPlugin = require('webpack-dashboard/plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var chokidar = require('chokidar');
var postcssVariablesPath = path.resolve(process.cwd(), '.config/postcss.variables.js');

chokidar.watch(postcssVariablesPath).on('all', (event, path) => {
  console.log('\n', '\x1b[36m', '=== Variables Updated ===', '\x1b[0m', '\n');
  delete require.cache[require.resolve(postcssVariablesPath)];
});

function loadVariables() {
  return require(postcssVariablesPath);
}

module.exports = {
  context: path.resolve(process.cwd(), 'src'),

  entry: {
    'polyfill': './polyfill.ts',
    'vendor': './vendor.ts',
    'main': './main.ts',
  },

  output: {
    filename: '[name].js?[hash]',
    path: path.join(process.cwd(), 'build'),
    publicPath: '/',
  },

  resolve: {
    modules: [
      path.resolve(process.cwd(), 'src'),
      'node_modules'
    ],
    extensions: ['.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.html$/,
        loader: 'ng-cache-loader',
        options: {
          exportId: true,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]?[hash]',
        },
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(process.cwd(), 'src/styles'),
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader', options: {
                config: {
                  path: path.resolve('.config/postcss.config.js'),
                  ctx: { variables: loadVariables, },
                }
              }
            },
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(process.cwd(), 'src/styles'),
        ],
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader', options: {
              config: {
                path: path.resolve('.config/postcss.config.js'),
                ctx: { variables: loadVariables, },
              }
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new DashboardPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['main', 'vendor', 'polyfill'],
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      inject: false,
      model: require('../src/mock-model.js'),
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
