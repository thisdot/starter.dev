import { defineConfig } from 'cypress';

export default defineConfig({
	viewportHeight: 720,
	viewportWidth: 1280,
	component: {
		specPattern: 'src/tests/*.{cy,spec}.{js,ts,jsx,tsx}',
		devServer: {
			framework: 'vue',
			bundler: 'vite',
		},
	},
});
