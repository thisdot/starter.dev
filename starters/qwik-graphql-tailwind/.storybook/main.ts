// Based on https://github.com/BuilderIO/qwik/discussions/787#discussioncomment-3715103

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: '@storybook/html',
  core: {
    builder: '@storybook/builder-vite',
  },
  viteFinal: async (config, options) => {
    const { qwikVite: qwikVite } = await import('@builder.io/qwik/optimizer');
    config.plugins?.unshift(qwikVite());
    return config;
  },
  features: {
    storyStoreV7: true,
  },
};
