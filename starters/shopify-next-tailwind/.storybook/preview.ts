import type { Preview } from '@storybook/react';
import '../app/globals.css';
import '../app/custom-font.css';

const preview: Preview = {
	parameters: {
		nextjs: {
			appDirectory: true,
		},
		actions: { argTypesRegex: '^on[A-Z].*' },
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
};

export default preview;
