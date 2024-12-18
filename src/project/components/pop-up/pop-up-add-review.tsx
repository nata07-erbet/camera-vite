import { PopUpMain, PopUpMainProps } from './pop-up-main';
import { RateBar } from './rate-bar/rate-bar';

type PopUpAddReviewProps = PopUpMainProps;

function PopUpAddReview ({ ...props}: PopUpAddReviewProps) {
  return (
    <PopUpMain { ...props}>
       <p className="title title--h4">Оставить отзыв</p>
        <div className="form-review">
          <form method="post">
            <div className="form-review__rate">
              <fieldset className="rate form-review__item">
                <legend className="rate__caption">
                  Рейтинг
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </legend>

                <div className="rate__bar">
                <RateBar />
                 

                </div>
                <p className="rate__message">Нужно оценить товар</p>
              </fieldset>

              <div className="custom-input form-review__item">
                <label>
                  <span className="custom-input__label">
                    Ваше имя
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="user-name"
                    placeholder="Введите ваше имя"
                    required=""
                  />
                </label>
                <p className="custom-input__error">Нужно указать имя</p>
              </div>
              <div className="custom-input form-review__item">
                <label>
                  <span className="custom-input__label">
                    Достоинства
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="user-plus"
                    placeholder="Основные преимущества товара"
                    required=""
                  />
                </label>
                <p className="custom-input__error">Нужно указать достоинства</p>
              </div>
              <div className="custom-input form-review__item">
                <label>
                  <span className="custom-input__label">
                    Недостатки
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="user-minus"
                    placeholder="Главные недостатки товара"
                    required=""
                  />
                </label>
                <p className="custom-input__error">Нужно указать недостатки</p>
              </div>
              <div className="custom-textarea form-review__item">
                <label>
                  <span className="custom-textarea__label">
                    Комментарий
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <textarea
                    name="user-comment"
                    minLength={5}
                    placeholder="Поделитесь своим опытом покупки"
                    defaultValue={""}
                  />
                </label>
                <div className="custom-textarea__error">
                  Нужно добавить комментарий
                </div>
              </div>
            </div>
            <button className="btn btn--purple form-review__btn" type="submit">
              Отправить отзыв
            </button>
          </form>
        </div>
    </PopUpMain>

    );
}

export { PopUpAddReview };

