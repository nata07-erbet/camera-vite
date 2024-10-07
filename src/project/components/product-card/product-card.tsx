import { TCamera } from '../../types/types';
import { Link , generatePath } from 'react-router-dom';

type ProductCardProps = {
  camera: TCamera;
  onOpen? : () => void;
  onClick?: (id: TCamera['id']) => void;
};

function ProductCard({onOpen, onClick, camera }: ProductCardProps) {
  const href = generatePath('/camera/:id',{
    id: (camera.id).toString()
  }
  );

  const handleClickButtonBuy = () => {
    onOpen?.();
  };

  const handleClickButtonAbout = (id: TCamera['id']) => {
    onClick?.(id);
  };

  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={camera.previewImg}
          />
          <img
            src={camera.previewImg}
            srcSet={camera.previewImg2x}
            width={280}
            height={240}
            alt={camera.name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-full-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star" />
          </svg>
          <svg width={17} height={16} aria-hidden="true">
            <use xlinkHref="#icon-star" />
          </svg>
          <p className="visually-hidden">Рейтинг: 3</p>
          <p className="rate__count">
            <span className="visually-hidden">Всего оценок:</span>23
          </p>
        </div>
        <p className="product-card__title">
          {camera.name}
        </p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>{camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={handleClickButtonBuy}
        >
          Купить
        </button>
        <Link
          className="btn btn--transparent"
          to={href}
          onClick={handleClickButtonAbout}
        >
            Подробнее
        </Link>
      </div>
    </div>
  );
}

export { ProductCard };

