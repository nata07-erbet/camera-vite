import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import { AppRoutes } from '../../const/const';

import { Catalog } from '../../pages/catalog';
import { Product } from '../../pages/product';
import { NotFoundPage } from '../../pages/404';

const router = createBrowserRouter([
  {
    path: AppRoutes.Main,
    element: <Catalog />,
  },
  {
    path: AppRoutes.Camera,
    element: <Product />
  }, {
    path: '/*',
    element: <NotFoundPage />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export { App };

