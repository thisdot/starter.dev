import "vuetify/dist/vuetify.css";
import { create } from '@storybook/theming';
import { action } from '@storybook/addon-actions';
import { app, addDecorator } from '@storybook/vue3';
import { Vuetify } from '../plugins/vuetify';
import { createPinia } from 'pinia';


// Support for pina in Storybook
const pinia = createPinia();
app.use(pinia);

// Support for vuetify in Storybook
app.use(Vuetify);
addDecorator(() => ({
    template:
      '<v-app><story/></v-app>',
}));

// Support for nuxt-link in Storybook
app.component('NuxtLink', {
  props: ['to'],
  methods: {
    log() {
      action('link target')(this.to)
    },
  },
  template: '<a @click="log()" style="cursor:pointer;"><slot>NuxtLink</slot></a>',
});

const darkTheme = create({
  base: 'dark',
  appBg: '#212128',
  barBg: '#17171d',
  appContentBg: '#f8f8f8',
  inputBg: '#0d0d10',
  colorPrimary: '#ff4785',
  colorSecondary: '#2c85fc',
})

const lightTheme = create({
  base: 'light',
  appBg: '#f6f9fc',
  barBg: '#ffffff',
  appContentBg: '#ffffff',
  inputBg: '#ffffff',
  colorPrimary: '#ff4785',
  colorSecondary: '#1ea7fd',
})

export const parameters = {
  darkMode: {
    dark: darkTheme,
    light: lightTheme,
  }
};
