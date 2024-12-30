import { render, screen } from '@testing-library/react';
import { PopUpAddReview } from './pop-up-add-review';

describe('component: PopUpContact', () => {
  it('should render correctly', () => {
    const expectedText = 'Отправить отзыв';

    const preparedComponent = (
      <PopUpAddReview
        onSubmit={vi.fn()}
        cameraId={1}
        isActive={false}
      />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
