import classNames from 'classnames';
import { ChangeEvent, useState } from 'react';
import { TCamera } from '../../types/types';
import { MAX_CAMERA, MIN_CAMERA } from '../../const/const';


type BasketItemProps = {
  camera: TCamera;
  onDeleteFromBasket: (id: TCamera['id']) => void;
  selectedId?: TCamera['id'] | null;
  isSending: boolean;
};

function BasketItem ({ camera, onDeleteFromBasket, selectedId, isSending }: BasketItemProps) {
  const [ initCount, setInitCount ] = useState(1);
  const isRemoveItem = camera.id === selectedId ? true : false;

  const getValid = (count: number) => {
    if(count >= MIN_CAMERA && count <= MAX_CAMERA) {
      return count;
    } else if(count > MAX_CAMERA) {
      return MAX_CAMERA;
    } else if(count < MIN_CAMERA) {
      return MIN_CAMERA;
    }
  };

  const handleClickDelete = (id: TCamera['id']) => {
    onDeleteFromBasket(id);
  };

  const handleClickDec = () => {
    const newCount = initCount - 1;
    setInitCount(newCount);
  };

  const handleClickInc = () => {
    const newCount = initCount + 1;
    setInitCount(newCount);
  };


  const handleClickAddValue = (evt: ChangeEvent<HTMLInputElement>) => {
    const count = Number(evt.target.value);
    getValid(count);
    setInitCount(count);
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
            srcSet={camera.previewImgWebp}
          />
          <img
            src={camera.previewImg}
            srcSet={camera.previewImg2x}
            width={140}
            height={120}
            alt={camera.name}
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
      <div className="quantity">
        <button
          className="btn-icon btn-icon--prev"
          aria-label="уменьшить количество товара"
          onClick={handleClickDec}
          disabled={isSending}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
        <label className="visually-hidden" htmlFor="counter1" />
        <input
          type="number"
          id="counter1"
          min={1}
          max={99}
          aria-label="количество товара"
          value={getValid(initCount)}
          onChange={handleClickAddValue}
        />
        <button
          className="btn-icon btn-icon--next"
          aria-label="увеличить количество товара"
          onClick={handleClickInc}
          disabled={isSending}
        >
          <svg width={7} height={12} aria-hidden="true">
            <use xlinkHref="#icon-arrow" />
          </svg>
        </button>
      </div>
      <div className="basket-item__total-price">
        <span className="visually-hidden">Общая цена:</span>{getValid(initCount) * camera.price}
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Удалить товар"
        onClick={() => handleClickDelete(camera.id)}
        disabled={isSending}
      >
        <svg width={10} height={10} aria-hidden="true">
          <use xlinkHref="#icon-close" />
        </svg>
      </button>
    </li>
  );
}

export { BasketItem };

