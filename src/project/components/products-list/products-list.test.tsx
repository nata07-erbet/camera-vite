import { screen } from '@testing-library/react';
import { ProductsList } from './products-list';
import { cameraMocks } from '../../mocks/camera-mocks';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('component: productsMocks', () => {
  it('should render correctly', () => {
    const expectedTestId = 'product-container';
    const preparedComponent = (
      <ProductsList cameras={cameraMocks} onOpen={vi.fn()} />
    );

    renderWithRouter(preparedComponent);
    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
