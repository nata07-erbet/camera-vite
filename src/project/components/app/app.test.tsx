import { render, screen } from '@testing-library/react';
import { AppRoutes } from '../../const/const';
import { createMemoryRouter, generatePath, RouterProvider } from 'react-router';
import { routeConfig } from '../../route-config/route-config';

const renderAppWithRouter = (route: string) => {
  const router = createMemoryRouter(routeConfig, {
    initialEntries: [route],
  });

  return render(<RouterProvider router={router} />);
};

describe('Application Routing', () => {
  it('should render "MainPage" when user navigates to "/"', () => {
    const expectData = 'main-page';
    const expectedText = 'Каталог фото- и видеотехники';

    renderAppWithRouter(AppRoutes.Main);

    expect(screen.getByTestId(expectData)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render "Product-page" when user navigates to "/product"', () => {
    const expectData = 'product-page';

    renderAppWithRouter(generatePath(AppRoutes.Camera, { id: '1', tab: null }));

    expect(screen.getByTestId(expectData)).toBeInTheDocument();
  });

  it('should render "ErrorPage" when user navigates to "/unknown-route"', () => {
    const expectData = 'error-page';

    renderAppWithRouter('/unknown-route');

    expect(screen.getByTestId(expectData)).toBeInTheDocument();
  });
});
