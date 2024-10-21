import { ProductCard } from '../product-card/product-card';
import { TCamera } from '../../types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './similar-list.css';

type SimilarListProps = {
  similars: TCamera[];
};

function SimilarList({ similars }: SimilarListProps) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation={{
        enabled: true,
        prevEl: '.slider-controls--prev',
        nextEl: '.slider-controls--next',
      }}
      className="similar-list"
      slidesPerView={3}
      slidesPerGroup={3}
      data-testid="swiper"
    >
      {similars.map((similar) => (
        <SwiperSlide key={similar.id}>
          <ProductCard camera={similar} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export { SimilarList };
