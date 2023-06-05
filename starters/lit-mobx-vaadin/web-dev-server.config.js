import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';

const replace = fromRollup(rollupReplace);

export default /** @type {import('@web/dev-server').DevServerConfig} */ ({
	watch: true,

	/** Resolve bare module imports */
	nodeResolve: {
		exportConditions: ['browser', 'development'],
	},

	/** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
	// esbuildTarget: 'auto'

	/** Set appIndex to enable SPA routing */
	appIndex: './index.html',
	plugins: [
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],

	// See documentation for all available options
});
