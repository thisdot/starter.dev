import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { inspect } from '@xstate/inspect';

import './assets/main.css';

inspect({
	iframe: false,
});

const app = createApp(App);

// we're making use of the provide functionality of Vue 3 to give our app this query value for the greet example
app.provide('query', 'from This Dot Labs!');

app.use(router);

app.mount('#app');
