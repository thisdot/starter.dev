import { Route, Router } from '@vaadin/router';

import './components/starter-layout.js';
import './components/home/starter-home.js';
import './components/counter-example/starter-counter.js';
import './components/fetch-example/starter-fetch.js';

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
