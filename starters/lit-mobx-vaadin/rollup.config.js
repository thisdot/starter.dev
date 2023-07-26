import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { rollupPluginHTML as html } from '@web/rollup-plugin-html';
import { importMetaAssets } from '@web/rollup-plugin-import-meta-assets';
import path from 'path';
import esbuild from 'rollup-plugin-esbuild';
import { generateSW } from 'rollup-plugin-workbox';

/** @type {import("rollup").RollupOptions} */
export default {
	strictDeprecations: true,
	input: 'index.html',
	output: {
		entryFileNames: '[hash].js',
		chunkFileNames: '[hash].js',
		assetFileNames: '[hash][extname]',
		format: 'es',
		dir: 'dist',
	},
	preserveEntrySignatures: false,

	plugins: [
		/** Enable using HTML as rollup entrypoint */
		html({
			minify: true,
			injectServiceWorker: true,
			serviceWorkerPath: 'dist/sw.js',
		}),
		/** Resolve bare module imports */
		nodeResolve(),
		replace({
			preventAssignment: true,
			'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		/** Minify JS, compile JS to a lower language target */
		esbuild({
			minify: true,
			target: ['chrome64', 'firefox67', 'safari11.1'],
		}),
		/** Bundle assets references via import.meta.url */
		importMetaAssets(),
		/** Minify html and css tagged template literals */
		babel({
			babelHelpers: 'bundled',
			plugins: [
				[
					'template-html-minifier',
					{
						modules: { lit: ['html', { name: 'css', encapsulation: 'style' }] },
						failOnError: false,
						strictCSS: true,
						htmlMinifier: {
							collapseWhitespace: true,
							conservativeCollapse: true,
							removeComments: true,
							caseSensitive: true,
							minifyCSS: true,
						},
					},
				],
			],
		}),
		/** Create and inject a service worker */
		generateSW({
			globIgnores: ['polyfills/*.js', 'nomodule-*.js'],
			navigateFallback: '/index.html',
			// where to output the generated sw
			swDest: path.join('dist', 'sw.js'),
			// directory to match patterns against to be precached
			globDirectory: path.join('dist'),
			// cache any html js and css by default
			globPatterns: ['**/*.{html,js,css,webmanifest}'],
			skipWaiting: true,
			clientsClaim: true,
			runtimeCaching: [{ urlPattern: 'polyfills/*.js', handler: 'CacheFirst' }],
		}),
	],
};
