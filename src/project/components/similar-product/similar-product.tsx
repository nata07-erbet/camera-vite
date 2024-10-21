import { ProductCard } from '../product-card/product-card';
import { TCamera } from '../../types/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './similar-product.css';

type SimilarProductProps = {
  similars: TCamera[];
};

function SimilarProduct({ similars }: SimilarProductProps) {
  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
          <h2 className="title title--h3">Похожие товары</h2>
          <div className="product-similar__slider">
            <Swiper
              modules={[Navigation]}
              navigation={{
                enabled: true,
                prevEl: '.slider-controls--prev',
                nextEl: '.slider-controls--next',
              }}
              className="product-similar__slider-list"
              slideActiveClass="is-active"
              slidesPerView={3}
              slidesPerGroup={3}
              data-testid="similar-products-list"
            >
              {similars.map((similar) => (
                <SwiperSlide key={similar.id}>
                  <ProductCard camera={similar} />
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
