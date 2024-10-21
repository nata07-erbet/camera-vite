import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import { routeConfig } from '../../route-config/route-config';

const router = createBrowserRouter(routeConfig);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export { App };

