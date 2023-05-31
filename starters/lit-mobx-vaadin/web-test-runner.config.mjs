import rollupReplace from '@rollup/plugin-replace';
import { fromRollup } from '@web/dev-server-rollup';
import { playwrightLauncher } from '@web/test-runner-playwright';

const replace = fromRollup(rollupReplace);

const filteredLogs = ['Running in dev mode', 'lit-html is in dev mode'];

export default /** @type {import("@web/test-runner").TestRunnerConfig} */ ({
	/** Test files to run */
	files: ['out-tsc/src/**/*.spec.js', '!**/node_modules/**/*'],

	/** Resolve bare module imports */
	nodeResolve: {
		exportConditions: ['browser', 'development'],
	},

	/** Filter out lit dev mode logs */
	filterBrowserLogs(log) {
		for (const arg of log.args) {
			if (typeof arg === 'string' && filteredLogs.some(l => arg.includes(l))) {
				return false;
			}
		}
		return true;
	},

	/** Compile JS for older browsers. Requires @web/dev-server-esbuild plugin */
	// esbuildTarget: 'auto',

	/** Amount of browsers to run concurrently */
	// concurrentBrowsers: 2,

	/** Amount of test files per browser to test concurrently */
	// concurrency: 1,

	/** Browsers to run tests on */
	browsers: [
		playwrightLauncher({ product: 'chromium' }),
		playwrightLauncher({ product: 'firefox' }),
		playwrightLauncher({ product: 'webkit' }),
	],

	plugins: [
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('development'),
		}),
	],

	// See documentation for all available options
	coverageConfig: {
		include: ['**/src/**'],
	},
});
