import { Route, Router } from '@vaadin/router';

import './pages/counter/counter.js';
import './pages/greeting/greeting.js';
import './pages/home/home.js';
import './pages/starter-layout.js';

const routes: Route[] = [
	{
		path: '',
		component: 'starter-layout',
		children: [
			{
				path: '',
				component: 'starter-home',
			},
			{
				path: 'counter',
				component: 'starter-counter',
			},
			{
				path: 'greet',
				component: 'starter-greeting',
			},
		],
	},
];

export const router = new Router(null);
router.setRoutes(routes);
