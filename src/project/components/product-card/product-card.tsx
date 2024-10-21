import classNames from 'classnames';
import { TCamera } from '../../types/types';
import { Link, generatePath } from 'react-router-dom';

type ProductCardProps = {
  camera: TCamera;
  onOpen?: (id: TCamera['id']) => void | undefined;
  active?: boolean;
};

function ProductCard({ onOpen, camera, active }: ProductCardProps) {
  const href = generatePath('/camera/:id', {
    id: camera.id.toString(),
  });

  const handleClickButtonBuy = (id: TCamera['id']) => {
    onOpen?.(id);
  };

  return (
    <div
      className={classNames('product-card', { 'is-active': active })}
      data-testid="camera"
    >
      <div className="product-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={generateImgUrl(camera.previewImg)}
          />
          <img
            src={generateImgUrl(camera.previewImg)}
            srcSet={generateImgUrl(camera.previewImg2x)}
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
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={() => handleClickButtonBuy(camera.id)}
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={href}>
          Подробнее
        </Link>
      </div>
    </div>
  );
}

const generateImgUrl = (img: string) => `${window.location.origin}/${img}`;

export { ProductCard };
