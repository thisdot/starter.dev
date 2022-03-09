const path = require('path');

module.exports = {
  async viteFinal(config, { configType }) {
    return {
      ...config,
      resolve: {
        alias: {
          remix: path.resolve(__dirname, '../__mockRemix__'),
        },
      },
    };
  },
  stories: [
    '../app/components/**/*.stories.mdx',
    '../app/components/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-postcss',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'storybook-builder-vite',
  },
};
