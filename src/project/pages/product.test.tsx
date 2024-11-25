import { screen } from '@testing-library/react';
import { Product } from './product';
import { renderWithRouter } from '../utils/mock-components/test-utils';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedData = 'product-page';

    renderWithRouter(<Product />);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
