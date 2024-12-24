import { PopUpMain, PopUpMainProps } from '../pop-up/pop-up-main';

type PopUpReviewThanksProps = PopUpMainProps & {
  onClosePopUpReviewThanks: () => void;
};

function PopUpReviewThanks ({ onClosePopUpReviewThanks, ...props }: PopUpReviewThanksProps) {

  const handleClickButton = () => {
    onClosePopUpReviewThanks();
  };

  return(
    <PopUpMain { ...props }>
      <p className="title title--h4">Спасибо за отзыв</p>
      <svg className="modal__icon" width={80} height={78} aria-hidden="true">
        <use xlinkHref="#icon-review-success" />
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={handleClickButton}
        >
          Вернуться к покупкам
        </button>
      </div>
    </PopUpMain>
  );
}

export { PopUpReviewThanks };
