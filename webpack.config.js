const path = require('path');
const webpack = require('webpack');
const babelConfig = require('./babel.config');
const IndexPlugin = require('./IndexPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


// const base = require('./webpack.base.js');
module.exports = {
  entry: {
    app: ['./src/index.js'],
  },
  output: {
    path: `${__dirname}/lib`,
    filename: '[name].js',
    library: 'gov-shared-ui',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  // externals: base.externals,
  module: {
    loaders: [
      {
        test: /\.js/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: babelConfig.babelClientOptions,
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: true,
            camelCase: true,
            localIdentName: '[name]__[local]',
          },
        }, 'sass-loader'],
        include: [
          path.resolve('./src'),
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/src/index.html`,
      filename: 'index.html',
      inject: 'body',
    }),
    new webpack.HotModuleReplacementPlugin(),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      children: true,
      minChunks: 2,
      async: true,
    }),
    new IndexPlugin(),
  ],

  resolve: {
    modules: ['src/components', 'node_modules'],
  },
};
