import { render, screen } from '@testing-library/react';
import { ReviewsList } from './reviews-list';
import { reviewMocks } from '../../mocks/review-mocks';

describe('component: ', () => {
  it('should render correctly', () => {
    const expectedText = 'Оставить свой отзыв';

    const preparedComponent = (
      <ReviewsList reviews={reviewMocks} onClickAddReview={vi.fn()} />
    );

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
