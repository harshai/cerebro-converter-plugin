const webpack = require('webpack');
const path = require('path');
const FlowWebpackPlugin = require('flow-webpack-plugin');

module.exports = {
  entry: {
    index: ['babel-polyfill', './src/index']
  },
  output: {
    path: './dist',
    libraryTarget: 'commonjs2',
    filename: 'index.js'
  },
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules'),
    ]
  },
  target: 'electron-renderer',
  module: {
    rules: [{
      test: /\.js?$/,
      use: {
        loader: 'babel-loader'
      },
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        query: {
          modules: true
        }
      }]
    }, {
      test: /\.svg$/,
      loader: 'raw-loader'
    }]
  },
  plugins: [
    new FlowWebpackPlugin(),
  ],
};
