var path = require('path');
var merge = require('webpack-merge');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

/* Import common configuration for debug and dist */
var commonConfig = require('./common.config.js');

module.exports = merge.smart(commonConfig, {

  plugins: [
    new ExtractTextPlugin('[name].css?[hash]'),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
      options: {
        htmlLoader: {
          minimize: true,
          removeAttributeQuotes: false,
        },
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      parallel: {
        cache: true,
        workers: 4,
      },
      uglifyOptions: {
        ie8: false,
        warnings: false,
        output: {
          comments: false,
        },
        mangle: {
          keep_fnames: true,
        },
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': `"production"`,
      }
    }),
  ],
});
