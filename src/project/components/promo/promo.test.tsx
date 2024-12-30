import { screen } from '@testing-library/react';
import { Promo } from './promo';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('component: BannerOffer', () => {
  it('should render correctly', () => {
    const expectedTestId = 'promo';

    const preparedComponent = <Promo onSubmit={vi.fn()}  />;

    renderWithRouter(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
