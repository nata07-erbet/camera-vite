import { render, screen } from '@testing-library/react';
import { Review } from './review';
import { reviewMocks } from '../../mocks/review-mocks';

describe('component: ', () => {
  it('should render correctly', () => {
    const expectedText = 'Оценка: 1';

    const preparedComponent = <Review reviewItem={reviewMocks[1]} />;

    render(preparedComponent);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
