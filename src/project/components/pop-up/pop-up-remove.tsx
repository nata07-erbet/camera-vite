import { Link } from 'react-router-dom';
import { PopUpMain, PopUpMainProps } from './pop-up-main';
import { TCamera } from '../../types/types';

type PopUpRemoveProps = PopUpMainProps & {
  camera: TCamera;
  onRemoveFromBasket?: (id: TCamera['id']) => void;
};

function PopUpRemove ({ camera, onRemoveFromBasket, ...props }: PopUpRemoveProps) {

  const handleClickRemoveFromBasket = (id: TCamera['id']) => {
    onRemoveFromBasket?.(id);
  };

  return(
    <PopUpMain {...props}>
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source
              type="image/webp"
              srcSet={camera.previewImgWebp}
            />
            <img
              src={camera.previewImg}
              srcSet="img/content/orlenok@2x.jpg 2x"
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
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          onClick={() => handleClickRemoveFromBasket(camera.id)}
        >
          Удалить
        </button>
        <Link
          className="btn btn--transparent modal__btn modal__btn--half-width"
          to="#"
        >
          Продолжить покупки
        </Link>
      </div>
    </PopUpMain>
  );
}

export { PopUpRemove };
