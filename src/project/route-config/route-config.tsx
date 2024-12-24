import { AppRoutes } from '../const/const';

import { Catalog } from '../pages/catalog';
import { Product } from '../pages/product';
import { Basket } from '../pages/basket';
import { NotFoundPage } from '../pages/404';

const routeConfig = [
  {
    path: AppRoutes.Main,
    element: <Catalog data-testid="main-page" idAdd={0}/>,
  },
  {
    path: AppRoutes.Camera,
    element: <Product />
  },
  {
    path: AppRoutes.Basket,
    element: <Basket />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
];

export { routeConfig };

