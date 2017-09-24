/*
* Licensed Materials - Property of IBM
* 5724-Q36
* (c) Copyright IBM Corp. 2017
* US Government Users Restricted Rights - Use, duplication or disclosure
* restricted by GSA ADP Schedule Contract with IBM Corp.
*/
const externals = require('./webpack.base.js').externals;

module.exports = {

  entry: './lib/index.js',
  output: {
    path: `${__dirname}/dist`,
    filename: 'gov-shared-ui.js',
  },
  externals,
  module: {
    loaders: [
      {
        test: /index.js$/,
        loader: 'babel-loader',
        query: { presets: ['es2015'] },
      },
    ],
  },
};
