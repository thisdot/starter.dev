import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { inspect } from '@xstate/inspect';

import './assets/main.css';

inspect({
	iframe: false,
});

const app = createApp(App);

app.use(router);

app.mount('#app');
