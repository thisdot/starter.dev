import { storybookPlugin } from '@web/dev-server-storybook';
import baseConfig from '../web-dev-server.config.js';

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
	...baseConfig,
	appIndex: './index.storybook.html',
	plugins: [
		storybookPlugin({ type: 'web-components' }),
		...(baseConfig.plugins || []),
	],
});
