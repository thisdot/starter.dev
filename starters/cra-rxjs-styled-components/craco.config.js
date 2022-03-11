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
          '@components': ['./src/components/*'],
        },
      },
    },
  ],
};
