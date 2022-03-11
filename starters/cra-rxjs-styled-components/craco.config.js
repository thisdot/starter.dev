const CracoAlias = require('craco-alias');

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'options',
        baseUrl: './',
        aliases: {
          '@file': './src/file.js',
          '@dir': './src/some/dir',
          '@material-ui': './node_modules/@material-ui-ie10',
        },
      },
    },
  ],
};
