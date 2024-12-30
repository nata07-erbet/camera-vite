import { render, screen } from '@testing-library/react';
import { PopUpReviewThanks } from './pop-up-review-thanks';

describe('component: PopUpContact', () => {
  it('should render correctly', () => {
    const expectedText = ' Удалить';

    const preparedComponent = (
      <PopUpReviewThanks isActive={false} onClosePopUpReviewThanks={vi.fn()} />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
