import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('../views/HomeView.vue'),
		},
		{
			path: '/counter',
			name: 'counter',
			component: () => import('../views/CounterView.vue'),
		},
		{
			path: '/greet',
			name: 'greet',
			component: () => import('../views/GreetView.vue'),
		},
	],
});

export default router;
