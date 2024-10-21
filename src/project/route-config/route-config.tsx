import { AppRoutes } from '../const/const';

import { Catalog } from '../pages/catalog';
import { Product } from '../pages/product';
import { NotFoundPage } from '../pages/404';

const routeConfig = [
  {
    path: AppRoutes.Main,
    element: <Catalog data-testid="main-page"/>,
  },
  {
    path: AppRoutes.Camera,
    element: <Product />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export { routeConfig };

