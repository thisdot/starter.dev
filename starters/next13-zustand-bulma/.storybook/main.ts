import type { StorybookConfig } from '@storybook/nextjs';
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-links',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  /* This is a little hack to fix the issue with Bulma's tag
   component from the `tag` class being picked up by storybooks
   `Source` component and messing with the styles.
  */
  previewHead: (head) => `
  ${head}
  <style>
    pre.prismjs .tag {
      align-items: initial;
      background-color: initial;
      border-radius: initial;
      display: initial;
      font-size: initial;
      height: initial;
      justify-content: initial;
      line-height: initial;
      padding-left: initial;
      padding-right: initial;
      white-space: initial;
    }
  </style>
`,
};
export default config;
