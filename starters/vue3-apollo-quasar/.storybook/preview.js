import '@quasar/extras/roboto-font/roboto-font.css';
// These are optional
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/animate/fadeInUp.css';
import '@quasar/extras/animate/fadeOutDown.css';
import '@quasar/extras/animate/fadeInRight.css';
import '@quasar/extras/animate/fadeOutRight.css';

// Loads the quasar styles and registers quasar functionality with storybook
import 'quasar/dist/quasar.css';
import { app } from '@storybook/vue3';
import { Quasar } from 'quasar';
import { createPinia } from 'pinia';

const pinia = createPinia();

// This is also where you would setup things such as pinia for storybook

app
.use(Quasar, {})
.use(pinia);

export const parameters = {
  actions: {
    argTypesRegex: '^on[A-Z].*',
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
