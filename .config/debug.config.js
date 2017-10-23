var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/* Import common configuration for debug and dist */
var commonConfig = require('./common.config.js');

module.exports = merge.smart(commonConfig, {

  plugins: [
    new ExtractTextPlugin({ disable: true }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        styleLoader: {
          sourceMap: true,
        },
        cssLoader: {
          sourceMap: true,
        },
        postcssLoader: {
          sourceMap: true,
        },
      },
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `"development"`,
      },
    }),
  ],

  devServer: {
    contentBase: path.join(process.cwd(), 'build'),
    compress: true,
    hot: true,
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
  },

  devtool: 'cheap-module-eval-source-map',
});
