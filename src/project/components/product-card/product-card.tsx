import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchCamera } from '../../store/action';
import { TCamera } from '../../types/types';
import { Link, generatePath } from 'react-router-dom';
import { Rate } from '../rate/rate';
import { AppRoutes } from '../../const/const';

type ProductCardProps = {
  camera: TCamera;
  isActive?: boolean;
  onOpen?: (id: TCamera['id']) => void | undefined;
  onClickBuy?: (id: TCamera['id']) => void | undefined;
  idSuccess?: TCamera['id'];
};

function ProductCard({
  onOpen,
  camera,
  isActive,
  onClickBuy,
}: ProductCardProps) {
  const dispatch = useAppDispatch();

  const cameraIntoBasket = useAppSelector((state) => state.cameraIntoBasket);
  const isAdded =
    cameraIntoBasket && camera.id === cameraIntoBasket.id ? true : false;

  const generateImgUrl = (img: string) => `${window.location.origin}/${img}`;
  const href = generatePath('/camera/:id', {
    id: camera.id.toString(),
  });

  const handleClickButtonBuy = (id: TCamera['id']) => {
    dispatch(fetchCamera(id));
    onOpen?.(id);
    onClickBuy?.(id);
  };

  return (
    <div
      className={classNames('product-card', { 'is-active': isActive })}
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
        <Rate camera={camera} />
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {camera.price} ₽
        </p>
      </div>
      <div className="product-card__buttons">
        {isAdded ? (
          <Link className="btn btn--purple-border" to={AppRoutes.Basket}>
            <svg width={16} height={16} aria-hidden="true">
              <use xlinkHref="#icon-basket" />
            </svg>
            В корзине
          </Link>
        ) : (
          <button
            className={classNames('btn', 'btn--purple', 'product-card__btn')}
            type="button"
            onClick={() => handleClickButtonBuy(camera.id)}
          >
            Купить
          </button>
        )}
        <Link
          className="btn btn--transparent"
          to={href}
          onClick={() => dispatch(fetchCamera(camera.id))}
        >
          Подробнее
        </Link>
      </div>
    </div>
  );
}

export { ProductCard };
