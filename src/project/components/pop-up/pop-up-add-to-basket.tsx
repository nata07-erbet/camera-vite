import { TCamera } from '../../types/types';
import { PopUpMain } from './pop-up-main';
import { PopUpMainProps } from './pop-up-main';

type PopUpAddToBasketProps = PopUpMainProps & {
  camera: TCamera;
  onClickAddSuccess: (id: TCamera['id'], camera: TCamera) => void;
};

function PopUpAddToBasket({ camera, onClickAddSuccess, ...props }: PopUpAddToBasketProps) {

  const handleClickAddSuccess = (id: TCamera['id'], cameraAdded: TCamera) => {
    onClickAddSuccess(id, cameraAdded);
  };

  return(
    <PopUpMain {...props}>
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={`/${camera.previewImgWebp}`}
            />
            <img
              src={`/${camera.previewImg}`}
              srcSet={`/${camera.previewImgWebp}`}
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
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>{camera.price} ₽
          </p>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={() => handleClickAddSuccess(camera.id, camera)}
        >
          <svg width={24} height={16} aria-hidden="true">
            <use xlinkHref="#icon-add-basket" />
          </svg>
          Добавить в корзину
        </button>
      </div>
    </PopUpMain>
  );
}

export { PopUpAddToBasket };
