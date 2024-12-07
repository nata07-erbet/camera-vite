import { Link, useNavigate } from 'react-router-dom';
import { PopUpMain } from './pop-up-main';
import { PopUpMainProps } from './pop-up-main';
import { AppRoutes } from '../../const/const';

type PopUpAddSuccessProps = PopUpMainProps & {
  onContinue: () => void;
};
function PopUpAddSuccess({ onContinue, ...props }: PopUpAddSuccessProps) {
  const navigate = useNavigate();

  const handleСontinueShopping = () => {
    onContinue();
  };

  const handleClickGoToBasket = () => {
    navigate(AppRoutes.Basket);
  };

  return (
    <PopUpMain {...props}>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width={86} height={80} aria-hidden="true">
        <use xlinkHref="#icon-success" />
      </svg>
      <div className="modal__buttons">
        <Link
          className="btn btn--transparent modal__btn"
          to="#"
          onClick={handleСontinueShopping}
        >
          Продолжить покупки
        </Link>
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          onClick={handleClickGoToBasket}
        >
          Перейти в корзину
        </button>
      </div>
    </PopUpMain>
  );
}

export { PopUpAddSuccess };

