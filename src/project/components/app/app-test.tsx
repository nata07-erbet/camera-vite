import { screen } from '@testing-library/react';
import { renderWithRouter } from '../../utils/mock-components/test-utils';
import { AppRoutes } from '../../const/const';
import { generatePath } from 'react-router';

describe('Application Routing', () => {
  it('should render "MainPage" when user navigates to "/"', () => {
    const expectData = 'main-page';
    const expectedText = 'Каталог фото- и видеотехники';

    renderWithRouter(AppRoutes.Main);

    expect(screen.getByTestId(expectData)).toBeInTheDocument();
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  it('should render "Product-page" when user navigates to "/product"', () => {
    const expectData = 'product-page';

    renderWithRouter(generatePath(AppRoutes.Product, { productId: '1', tab: null }));

    expect(screen.getByTestId(expectData)).toBeInTheDocument();
  });

  it('should render "ErrorPage" when user navigates to "/unknown-route"', () => {
    const expectData = 'error-page';

    renderWithRouter('/unknown-route');

    expect(screen.getByTestId(expectData)).toBeInTheDocument();
  });
});
