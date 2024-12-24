import { useNavigate } from 'react-router-dom';
import { PopUpMain, PopUpMainProps} from './pop-up-main';
import { AppRoutes } from '../../const/const';

type PopUpErrorProp = PopUpMainProps

function PopUpError ({ ...props }: PopUpErrorProp) {
  const navigate = useNavigate();

  const handleClickBackMain = () => {
    navigate(AppRoutes.Main);
  };

  return (
    <PopUpMain {...props}>
      <p className="title title--h4">
        Не удалось отправить заказ. Попробуйте еще раз
      </p>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleClickBackMain}
        >
          Вернуться в каталог
        </button>
      </div>
    </PopUpMain>

  );
}

export { PopUpError };

