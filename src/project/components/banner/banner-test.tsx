
import { render, screen } from '@testing-library/react';
import { Banner } from './banner';
import { promoMocks } from '../../mocks/promo-mocks';

describe('component: BannerOffer', () => {
  it('should render correctly', () => {
    const expectedTestId = 'banner-offer';

    const preparedComponent = <Banner camera={promoMocks[0]} />;

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
