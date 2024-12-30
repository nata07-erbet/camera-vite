import { render, screen } from '@testing-library/react';
import { PopUpAddToBasket } from './pop-up-add-to-basket';
import { cameraMock } from '../../mocks/camera-mocks';


describe('component: PopUpContact', () => {
  it('should render correctly', () => {
    const expectedText = '  Добавить в корзину';

    const preparedComponent = (
      <PopUpAddToBasket
        isActive={false}
        camera={cameraMock}
      onClickAddSuccess={vi.fn()}
      />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
