

const assign = require('object-assign');

const babelBaseOptions = {
  presets: [['es2015', { modules: false }], 'stage-0', 'react'],
};

const babelClientOptions = assign({}, babelBaseOptions, {
  cacheDirectory: true,
  env: {
    development: {
      presets: ['react-hmre'],
      plugins: [['react-transform', {
        transforms: [{
          transform: ['react-transform-catch-errors', 'transform-exponentiation-operator'],
          imports: [
            'react',
            'redbox-react',
          ],
        }],
      }]],
    },
  },
});

exports.babelBaseOptions = babelBaseOptions;
exports.babelClientOptions = babelClientOptions;
