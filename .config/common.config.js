var path = require('path');
var extend = require('webpack-merge');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var postcssVariablesPath = path.resolve(process.cwd(), 'src', 'styles', 'postcss.variables.js');
var postcssMixinsPath = path.resolve(process.cwd(), 'src', 'styles', 'postcss.mixins.js');

function loadVariables() {
  return require(postcssVariablesPath);
}

function loadMixins() {
  return require(postcssMixinsPath);
}

var postcssLoaders = [
  {
    loader: 'css-loader',
  },
  {
    loader: 'postcss-loader', options: {
      config: {
        path: path.resolve('.config/postcss.config.js'),
        ctx: { variables: loadVariables, mixins: loadMixins },
      }
    },
  },
  {
    loader: path.resolve('.config/require-clear-loader.js'),
    options: { files: [postcssVariablesPath, postcssMixinsPath] },
  },
];

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
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'awesome-typescript-loader',
      },
      {
        test: /\.html$/,
        loader: 'vue-html-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)$/,
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
          use: postcssLoaders,
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
        ].concat(postcssLoaders),
      },
    ],
  },

  plugins: [
    new ExtractTextPlugin('[name].css?[hash]'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['main', 'vendor', 'polyfill'],
    }),
    new HtmlWebpackPlugin({
      template: './index.ejs',
      inject: false,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};
