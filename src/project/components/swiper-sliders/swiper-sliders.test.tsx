import { screen } from '@testing-library/react';
import { SwiperSliders } from './swiper-sliders';
import { promoMocks } from '../../mocks/promo-mocks';
import { renderWithRouter } from '../../utils/mock-components/test-utils';

describe('component: SliderSwiper', () => {
  it('should render correctly', () => {
    const expectedTestId = 'swiper';

    const preparedComponent = <SwiperSliders promos={promoMocks} />;

    renderWithRouter(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
