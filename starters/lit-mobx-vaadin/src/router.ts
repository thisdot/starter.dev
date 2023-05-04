import { Route, Router } from '@vaadin/router';

import './pages/counter-example/starter-counter.js';
import './pages/fetch-example/starter-fetch.js';
import './pages/home/starter-home.js';
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
        path: 'api-example',
        component: 'starter-fetch',
      },
    ],
  },
];

export const router = new Router(null);
router.setRoutes(routes);
