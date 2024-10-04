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
    path: '/camera',
    element: <Product />
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export { App };

