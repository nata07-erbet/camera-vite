import { render, screen } from '@testing-library/react';
import { SwiperSliders} from './swiper-sliders';
import { promoMocks } from '../../mocks/promo-mocks';

describe('component: SliderSwiper', () => {
  it('should render correctly', () => {
    const expectedTestId = 'swiper';

    const preparedComponent =
      <SwiperSliders promos={promoMocks} />;

    render(preparedComponent);

    expect(screen.getByTestId(expectedTestId)).toBeInTheDocument();
  });
});
