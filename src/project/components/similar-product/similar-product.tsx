import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './similar-product.css';

import { TCamera } from '../../types/types';
import { ProductCard } from '../product-card/product-card';

type SimilarProductProps ={
  similars: TCamera[];
  onOpen?: (id: TCamera['id']) => void;
};

function SimilarProduct({ similars , onOpen }: SimilarProductProps) {
  const handleOpenPopUpAddBasket = (id: TCamera['id']) => {
    onOpen?.(id);
  };

  return (
    <div className="page-content__section" data-testid="similar-product">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <Swiper
              modules={[Navigation]}
              navigation={{
                enabled: true,
                prevEl:'.slider-controls--prev',
                nextEl: '.slider-controls--next'
              }}
              slidesPerView={3}
              slidesPerGroup={3}
              slideActiveClass='is-active'
              autoplay={{
                delay: 5000,
              }}
              className='product-similar__slider-list'
            >
              {similars.map((similar) => (
                <SwiperSlide key={similar.id}>
                  <ProductCard
                    camera={similar}
                    onOpen={(id) => handleOpenPopUpAddBasket(id)}
                    isAdded={isAdded}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <button
              className="slider-controls slider-controls--prev"
              type="button"
              aria-label="Предыдущий слайд"
              disabled
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
            <button
              className="slider-controls slider-controls--next"
              type="button"
              aria-label="Следующий слайд"
            >
              <svg width={7} height={12} aria-hidden="true">
                <use xlinkHref="#icon-arrow" />
              </svg>
            </button>
          </div>
        </div>
      </section>
    </div>

  );
}

export { SimilarProduct };

