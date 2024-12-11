import classNames from 'classnames';
import { TCamera } from '../../types/types';
import { Quantity } from '../quantity/quantity';

type BasketItemProps = {
  camera: TCamera;
  onDelete: () => void;
  isRemoveItem:  boolean;
};

function BasketItem ({ camera, onDelete, isRemoveItem }: BasketItemProps) {

  const handleClickDelete = () => {
    onDelete();
  };


  const classHidden = classNames(
    'basket-item',
    {'visually-hidden': isRemoveItem});

  return(
    <li className={classHidden}>
      <div className="basket-item__img">
        <picture>
          <source
            type="image/webp"
            srcSet="img/content/orlenok.webp, img/content/orlenok@2x.webp 2x"
          />
          <img
            src="img/content/orlenok.jpg"
            srcSet="img/content/orlenok@2x.jpg 2x"
            width={140}
            height={120}
            alt="Фотоаппарат «Орлёнок»"
          />
        </picture>
      </div>
      <div className="basket-item__description">
        <p className="basket-item__title">{camera.name}</p>
        <ul className="basket-item__list">
          <li className="basket-item__list-item">
            <span className="basket-item__article">Артикул:</span>{''}
            <span className="basket-item__number">{camera.vendorCode}</span>
          </li>
          <li className="basket-item__list-item">{camera.type}</li>
          <li className="basket-item__list-item">{camera.level}</li>
        </ul>
      </div>
      <p className="basket-item__price">
        <span className="visually-hidden">Цена:</span>{camera.price} ₽
      </p>
      <Quantity />
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>37 940 ₽
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={handleClickDelete}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

export { BasketItem };
