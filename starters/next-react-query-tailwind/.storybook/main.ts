import type { StorybookConfig } from '@storybook/nextjs';
import path from 'path';

const config: StorybookConfig = {
  stories: ['../src/pages/**/*.mdx', '../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  staticDirs: ['../public'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling',
      options: {
        // Check out https://github.com/storybookjs/addon-styling/blob/main/docs/api.md
        // For more details on this addon's options.
        postCss: true,
      },
    },
    'storybook-css-modules-preset',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  webpackFinal: async (config) => {
    if (!config.resolve) {
      config.resolve = {};
    }
    // Add alias for the public folder
    config.resolve.alias = {
      ...config.resolve.alias,
      '/assets': path.resolve(__dirname, '../public/assets'),
    };
    config.resolve.fallback = {
      querystring: false,
      path: false,
    };

    return config;
  },
};

export default config;
