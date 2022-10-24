const Solid = require('vite-plugin-solid');

module.exports = {
  core: {
    builder: '@storybook/builder-vite',
  },

  framework: '@storybook/html',

  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-docs',
    'storybook-addon-mock',
  ],

  async viteFinal(config, { configType }) {
    config.resolve.dedupe = ['@storybook/client-api'];
    config.plugins.unshift(
      Solid({
        hot: false,
      })
    );

    return config;
  },
};
