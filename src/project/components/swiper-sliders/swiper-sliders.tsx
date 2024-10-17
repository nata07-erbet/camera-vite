import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { TPromo } from '../../types/types';
import { Banner } from '../banner/banner';

type SwiperSlidersProps = {
  promos: TPromo[];
};
function SwiperSliders({ promos }: SwiperSlidersProps) {
  return(
    <Swiper
      autoplay={{
        delay: 3000
      }}
      modules={[ Autoplay, Pagination ]}
      pagination={{
        clickable: true,
        type: 'bullets',
      }}
    >
      {promos
        .map((promo) => (
          <SwiperSlide key={promo.id} >
            <Banner camera={promo} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
}

export { SwiperSliders };

