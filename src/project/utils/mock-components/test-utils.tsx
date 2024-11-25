import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { AppRoutes } from '../../const/const';

const renderWithRouter = (
  element: React.ReactElement,
  initialRoute: string = AppRoutes.Main
) => {
  const router = createMemoryRouter([{ path: initialRoute, element }], {
    initialEntries: [initialRoute],
  });
  return render(<RouterProvider router={router} />);
};

export { renderWithRouter };
