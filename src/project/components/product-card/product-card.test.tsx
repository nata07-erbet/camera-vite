import { screen } from '@testing-library/react';
import { ProductCard } from './product-card';
import { cameraMock } from '../../mocks/camera-mocks';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('component: productsMocks', () => {
  it('should render correctly', () => {
    const expectedTestId = 'camera';
    const preparedComponent = (
      <ProductCard camera={cameraMock} onOpen={vi.fn()} />
    );

    renderWithRouter(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
