import { render, screen } from '@testing-library/react';
import { ProductCard } from './product-card';
import { cameraMock } from '../../mocks/camera-mocks';

describe('component: productsMocks', () => {
  it('should render correctly', () => {
    const expectedTestId = 'product';
    const preparedComponent = <ProductCard camera={cameraMock} onOpen={vi.fn()}/>;

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
