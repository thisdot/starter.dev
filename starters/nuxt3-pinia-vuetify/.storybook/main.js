const path = require('path');
const { loadConfigFromFile, mergeConfig } = require('vite');

module.exports = {
	stories: [],
	addons: [
		'@storybook/addon-essentials',
		'@storybook/addon-a11y',
		'storybook-dark-mode',
	],
	framework: '@storybook/vue3',
	core: {
		builder: '@storybook/builder-vite',
	},
	async viteFinal(config, { configType }) {
		const { config: userConfig } = await loadConfigFromFile(
			path.resolve(__dirname, '../vite.config.ts')
		);

		config.resolve.alias = {
			...config.resolve.alias,
			'@': path.resolve(__dirname, '../'),
			'~': path.resolve(__dirname, '../'),
			'~~': path.resolve(__dirname, '../'),
		};

		return mergeConfig(config, {
			...userConfig,
			plugins: [],
		});
	},
};
