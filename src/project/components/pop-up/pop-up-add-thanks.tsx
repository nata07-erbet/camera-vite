import { useNavigate } from 'react-router-dom';
import { PopUpMain, PopUpMainProps} from './pop-up-main';
import { AppRoutes } from '../../const/const';

type PopUpAddThanksProp = PopUpMainProps;

function PopUpAddThanks ({ ...props}: PopUpAddThanksProp) {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(AppRoutes.Main);
  };

  return (
    <PopUpMain {...props}>
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleClickBack}
        >
          Вернуться к покупкам
        </button>
      </div>
    </PopUpMain>

  );
}

export { PopUpAddThanks };

