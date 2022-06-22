const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
  ],
  framework: '@storybook/vue3',
  staticDirs: ['../public'],
  webpackFinal: async (config, { configType }) => {
    // register webpack path aliases
    config.resolve.alias['~storybook'] = path.resolve(__dirname);
    config.resolve.alias['@'] = path.resolve(__dirname, '..', 'src');
    config.resolve.alias['src'] = path.resolve(__dirname, '..', 'src');
    // enable sass
    config.module.rules.push({
      test: /\.sass$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    });
    return config;
  },
  core: {
    builder: 'webpack5',
  },
};
