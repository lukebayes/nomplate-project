/* eslint-disable no-console */
console.log('Webpack server config loaded');
/* eslint-enable no-console */

module.exports = {
  name: 'server',
  target: 'node',
  module: {
    loaders: [
      {
        loader: 'json-loader',
        test: /\.json$/,
      },
    ],
  },
};
