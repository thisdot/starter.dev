import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';

const config: UserConfig = {
	plugins: [sveltekit()],
	server: {
		cors: {
			allowedHeaders: [
				'Access-Control-Allow-Origin'
			]
		}
	}
};

export default config;
