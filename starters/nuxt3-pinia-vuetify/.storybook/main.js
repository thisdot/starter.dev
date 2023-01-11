const path = require('path');
const { loadConfigFromFile, mergeConfig } = require("vite");

module.exports = {
  stories: [
    "../components/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-essentials",
    '@storybook/addon-a11y',
    'storybook-dark-mode'
  ],
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-vite"
  },
  async viteFinal(config, { configType }) {
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, "../vitest.config.ts")
    );

    return mergeConfig(config, {
      ...userConfig,
      plugins: [],
    });
  },
}
