// plugins/vuetify.js
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

export default defineNuxtPlugin( nuxtApp => {
  const vuetify = createVuetify( {
	theme: {
		defaultTheme: 'customTheme',
		themes: {
			customTheme: {
				dark: false,
				colors: {
					primary: '#3B82F6'
				}
			}
		}
	},
    components: {
		VBtn
    }
  } )

  nuxtApp.vueApp.use( vuetify );
})