// plugins/vuetify.js
import { createVuetify } from 'vuetify';
import { VBtn } from 'vuetify/components/VBtn';
import { VApp } from 'vuetify/components/VApp';
import { VProgressCircular } from 'vuetify/components/VProgressCircular';
import { VAlert } from 'vuetify/components/VAlert';

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
		VAlert,
	},
});

export default defineNuxtPlugin((nuxtApp) => {
	nuxtApp.vueApp.use(Vuetify);
});
