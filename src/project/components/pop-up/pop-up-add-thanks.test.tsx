import { render, screen } from '@testing-library/react';
import { PopUpAddThanks } from './pop-up-add-thanks';

describe('component: PopUpContact', () => {
  it('should render correctly', () => {
    const expectedText = 'Вернуться к покупкам';

    const preparedComponent = (
      <PopUpAddThanks isActive={false} />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
