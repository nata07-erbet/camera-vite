import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

import { AppRoutes } from '../../const/const';

import { Catalog } from '../../pages/catalog';
import { Product } from '../../pages/product';

const router = createBrowserRouter([
  {
    path: AppRoutes.Main,
    element: <Catalog />,
  },
  {
    path: AppRoutes.Camera,
    element: <Product />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export { App };

