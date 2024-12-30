import { screen } from '@testing-library/react';
import { BasketList } from './basket-list';
import { cameraMocks } from '../../mocks/camera-mocks';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('component: BannerOffer', () => {
  it('should render correctly', () => {
    const expectedTestId = 'basket-list'
    const preparedComponent = <BasketList
      cameras={cameraMocks}
      onDeleteFromBasket={vi.fn()}
      isSending={false}
      onChangeQuantity={vi.fn()}
      onInputQuantity={vi.fn()}
      />;

    renderWithRouter(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
