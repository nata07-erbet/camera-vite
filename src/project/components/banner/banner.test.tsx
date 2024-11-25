import { screen } from '@testing-library/react';
import { Banner } from './banner';
import { promoMocks } from '../../mocks/promo-mocks';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('component: BannerOffer', () => {
  it('should render correctly', () => {
    const expectedTestId = 'banner-offer';

    const preparedComponent = <Banner camera={promoMocks[0]} />;

    renderWithRouter(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
