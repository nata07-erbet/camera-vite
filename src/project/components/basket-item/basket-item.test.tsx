import { screen } from '@testing-library/react';
import { BasketItem } from './basket-item';
import { cameraMock } from '../../mocks/camera-mocks';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('component: BannerOffer', () => {
  it('should render correctly', () => {
    const expectedTestId = 'basket-item';

    const preparedComponent = (
      <BasketItem
        camera={cameraMock}
        onDeleteFromBasket={vi.fn()}
        onChangeQuantity={vi.fn()}
        onInputQuantity={vi.fn()}
      />);

    renderWithRouter(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
