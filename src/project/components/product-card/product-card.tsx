import classNames from 'classnames';
import { TCamera } from '../../types/types';
import { Link, generatePath } from 'react-router-dom';
import { Rate } from '../rate/rate';

type ProductCardProps = {
  camera: TCamera;
  isActive?: boolean;
  onOpen?: (id: TCamera['id']) => void | undefined;
};

function ProductCard({ onOpen, camera, isActive }: ProductCardProps) {
  const generateImgUrl = (img: string) => `${window.location.origin}/${img}`;

  const href = generatePath('/camera/:id', {
    id: camera.id.toString(),
  });

  const handleClickButtonBuy = (id: TCamera['id']) => {
    onOpen?.(id);
  };

  return (
    <div
      className={classNames('product-card', { 'is-active': isActive})}
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
        <Rate camera={camera}/>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          className={classNames(
            'btn','btn--purple',
            'product-card__btn',
            // { 'disabled': () => handleClickButtonBuy(camera.id)}
          )}
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

export { ProductCard };

