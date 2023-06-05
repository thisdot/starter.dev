// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	modules: ['@pinia/nuxt'],
	pinia: {
		autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
	},
	css: ['vuetify/lib/styles/main.sass'],
	build: {
		transpile: ['vuetify'],
	},
	vite: {
		define: {
			'process.env.DEBUG': false,
		},
	},
	runtimeConfig: {
		public: {
			baseUrl: process.env.BASE_URL || '/',
		}
	}
})
