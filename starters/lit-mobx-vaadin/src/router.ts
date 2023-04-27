import { Route, Router } from '@vaadin/router';

import './pages/starter-layout.js';
import './pages/home/starter-home.js';
import './pages/counter-example/starter-counter.js';
import './pages/fetch-example/starter-fetch.js';

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
        path: 'counter-example',
        component: 'starter-counter',
      },
      {
        path: 'fetch-example',
        component: 'starter-fetch',
      },
    ],
  },
];

export const router = new Router(null);
router.setRoutes(routes);
