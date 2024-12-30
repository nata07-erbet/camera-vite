import { render, screen } from '@testing-library/react';
import { PopUpAddSuccess } from './pop-up-add-success';

describe('component: PopUpContact', () => {
  it('should render correctly', () => {
    const expectedText = 'Перейти в корзину';

    const preparedComponent = (
      <PopUpAddSuccess
        onContinue={vi.fn()}
        isActive={false}
      />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
