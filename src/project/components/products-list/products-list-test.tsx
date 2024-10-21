import { render, screen } from '@testing-library/react';
import { ProductsList } from './products-list';
import { cameraMocks } from '../../mocks/camera-mocks';

describe('component: productsMocks', () => {
  it('should render correctly', () => {
    const expectedTestId = 'product-container';
    const preparedComponent = <ProductsList cameras={cameraMocks} onOpen={vi.fn()} />;

    render(preparedComponent);
    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
