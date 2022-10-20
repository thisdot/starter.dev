const { 
  typescript: preprocessTs, 
  scss: preprocessScss 
} = require('svelte-preprocess');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx|svelte)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-svelte-csf",
    "@storybook/preset-scss"
  ],
  "framework": "@storybook/svelte",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  "svelteOptions": {
    "preprocess": [
      preprocessTs(), // sveltekit-storybook typescript support
      preprocessScss() // sveltekit-storybook sass support
    ]
  },
  "features": {
    "storyStoreV7": true
  }
}