import { screen } from '@testing-library/react';
import { UpBtn } from './up-btn';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('component: Sorting', () => {
  it('should render correctly', () => {
    const expectedTestId = 'up';

    const preparedComponent = <UpBtn onScrollTop={vi.fn()} />;

    renderWithRouter(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
