import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchPromos } from '../../store/api-actions';


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './swiper-slider.css';
import { Banner } from '../banner/banner';


function SwiperSliders() {
  const dispatch = useAppDispatch();
  const promos = useAppSelector((state) => state.cameras);

  useEffect(() => {
    dispatch(fetchPromos());
  }, []);

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3000,
      }}
      pagination={{ clickable: true }}
      className="my-swiper"
      data-testid="swiper"
    >
      {promos.map((promo) => (

        <SwiperSlide key={promo.id}>
          <Banner camera={promo} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export { SwiperSliders };

