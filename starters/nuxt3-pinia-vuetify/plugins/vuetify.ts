// plugins/vuetify.js
import { createVuetify } from 'vuetify';
import { VBtn } from 'vuetify/components/VBtn';
import { VApp } from 'vuetify/components/VApp';
import { VProgressCircular } from 'vuetify/components/VProgressCircular';

export const Vuetify = createVuetify({
	ssr: true,
	theme: {
		defaultTheme: 'customTheme',
		themes: {
			customTheme: {
				dark: false,
				colors: {
					primary: '#3B82F6',
				},
			},
		},
	},
	components: {
		VBtn,
		VApp,
		VProgressCircular,
	},
});

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Vuetify);
});
