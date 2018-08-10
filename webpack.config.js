const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const config = {
  entry: ['babel-polyfill', 'whatwg-fetch', './app/index.js'],
  output: {
    filename: 'index_bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      { test: /\.(js)$/, use: 'babel-loader' },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.svg$/, use: ['file-loader'] },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './app/index.html',
    }),
  ],
  mode: 'development',
  node: {
    fs: 'empty',
  },
};

if (process.env.NODE_ENV === 'production') {
  config.plugins = [
    ...config.plugins,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ];

  config.optimization = { minimize: true };
}

module.exports = config;
