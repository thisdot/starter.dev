// plugins/vuetify.js
import { defineNuxtPlugin } from '#app'
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import { VApp } from 'vuetify/components/VApp'

export const Vuetify = createVuetify({
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
    VBtn,
    VApp
  }
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Vuetify)
})
