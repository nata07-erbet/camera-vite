import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { AppRoutes } from '../../const/const';
import { routeConfig } from '../../route-config/route-config';

const renderWithRouter = (initialRoute: string = AppRoutes.Main) => {
  const router = createMemoryRouter(routeConfig, {
    initialEntries: [initialRoute],
  });
  return render(<RouterProvider router={router} />);
};

export { renderWithRouter };
