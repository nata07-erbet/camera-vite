import { render, screen } from '@testing-library/react';
import { Product } from './product';

describe('Component: NotFoundScreen', () => {
  it('should render correctly', () => {
    const expectedData = 'product-page';

    render (<Product/>);

    expect(screen.getByText(expectedData)).toBeInTheDocument();
  });
});
