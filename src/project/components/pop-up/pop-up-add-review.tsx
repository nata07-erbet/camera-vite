import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { api } from '../../api/api';
import { TReviewPost } from '../../types/types';
import  classNames from  'classnames'
import { PopUpMain, PopUpMainProps } from './pop-up-main';
import { RequestStatus, ReqRoutes } from '../../const/const';
import { RateBarMap, SettingValidation} from '../../const/const';

type PopUpAddReviewProps = PopUpMainProps & {
  cameraId: number;
  onSubmit: () => void;
};

type FormInputs = {
  id: string;
  createAt: string;
  userName: string;
  userPlus: string;
  userMinus: string;
  userComment: string;
  rate: string;
};

function PopUpAddReview ({cameraId, onSubmit, ...props}: PopUpAddReviewProps) {
  const [ sendingStatus, setSendingStatus ] = useState();

  const isSending = sendingStatus == RequestStatus.Pending;

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<FormInputs>({
    mode: 'all',
    defaultValues: {
      rate: '0'
    }});

  const classInValidRate = classNames('rate', 'form-review__item', {'is-invalid': !!errors.rate});
  const classInValidName = classNames('custom-input', 'form-review__item', {'is-invalid': !!errors.userName});
  const classInValidPlus =  classNames('custom-input', 'form-review__item', {'is-invalid': !!errors.userPlus});
  const classInValidMinus = classNames('custom-input', 'form-review__item', {'is-invalid': !!errors.userMinus});
  const classInValidComment = classNames('custom-textarea form-review__item', {'is-invalid': !!errors.userComment});

  const rateInput = register('rate', {
    required: {
      value: true,
      message: SettingValidation.UserMessageRateRequired,
    },
    pattern: {
      value: /^[1-5]$/,
      message: SettingValidation.UserMessageRateValidation,
    },
    validate: {
      isInt: value => Number(value) % 1 == 0
    }
  });
  const ratingValue = watch('rate');

  const userNameInput = register('userName', {
    required: {
      value: true,
      message: SettingValidation.UserNameMessageRequired,
    },
    pattern: {
      value: /^[а-яА-ЯёЁa-zA-Z0-9]{2,15}$/,
      message: SettingValidation.UserPlusMessageValidation
    },
  });

  const userPlusInput = register('userPlus', {
    required: {
      value: true,
      message: SettingValidation.UserPlusMessageRequired
    },
    pattern: {
      value: /^[а-яА-ЯёЁa-zA-Z0-9]{10,160}$/,
      message: SettingValidation.UserPlusMessageValidation
    },
  });


  const userMinus = register('userMinus', {
    required: {
      value: true,
      message: SettingValidation.UserMinusMessageRequired
    },
    pattern: {
      value: /^[а-яА-ЯёЁa-zA-Z0-9]{10,160}$/,
      message: SettingValidation.UserMinusMessageValidation
    },
  });

  const userComment = register('userComment', {
    required:  {
      value: true,
      message: SettingValidation.UserCommentMessageRequired
    },
    pattern: {
      value: /^[а-яА-ЯёЁa-zA-Z0-9]{10,160}$/,
      message: SettingValidation.UserCommentMessageValidation
    },
  });

  const onSubmitForm: SubmitHandler<FormInputs> = (data: FormInputs) => {
      const formData: TReviewPost = {
        cameraId: cameraId,
        userName: data.userName,
        advantage: data.userPlus,
        disadvantage: data.userMinus,
        review: data.userComment,
        rating: Number(ratingValue),
      };

      api
        .post(ReqRoutes.Reviews, formData)
        .then((response) => {
          console.log(response);
          setSendingStatus(RequestStatus.Success);
          onSubmit
        })
        .catch((err) => setError('root', err))
        ;
  }

  return (
    <PopUpMain { ...props}>
       <p className="title title--h4">Оставить отзыв</p>
        <div className="form-review">
          <form
            method="post"
            onSubmit={handleSubmit(onSubmitForm)}
          >
            <div className="form-review__rate">
              <fieldset className={classInValidRate}>
                <legend className="rate__caption">
                  Рейтинг
                  <svg width={9} height={9} aria-hidden="true">
                    <use xlinkHref="#icon-snowflake" />
                  </svg>
                </legend>
                <div className="rate__bar">
                  <div className="rate__group">
                    {Object
                      .entries(RateBarMap)
                      .reverse()
                      .map(([key, value]) => (
                        <>
                          <input
                            className="visually-hidden"
                            id={`star-${key}`}
                            type="radio"
                            value={key}
                            disabled={isSending}
                            {...rateInput}
                          />
                          <label
                            className="rate__label"
                            htmlFor={`star-${key}`}
                            title={value} />
                        </>
                      ))}
                  </div>
                  <div className="rate__progress">
                    <span className="rate__stars">{ratingValue}</span>
                    <span>/</span>{" "}
                    <span className="rate__all-stars">5</span>
                  </div>
                </div>
                {errors.rate &&  <p className="rate__message">Нужно оценить товар</p> }
              </fieldset>
              <div className={classInValidName}>
                <label>
                  <span className="custom-input__label">
                    Ваше имя
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Введите ваше имя"
                    {...userNameInput}
                  />
                </label>
                {errors.userName && (<p className="custom-input__error">Нужно указать имя</p>)}
              </div>
              <div className={classInValidPlus}>
                <label>
                  <span className="custom-input__label">
                    Достоинства
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Основные преимущества товара"
                    {...userPlusInput}
                  />
                </label>
                {errors.userPlus && (<p className="custom-input__error">Нужно указать достоинства</p>)}
              </div>
              <div className={classInValidMinus}>
                <label>
                  <span className="custom-input__label">
                    Недостатки
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Главные недостатки товара"
                    {...userMinus}
                  />
                </label>
                {errors.userMinus && (<p className="custom-input__error">Нужно указать недостатки</p>)}
              </div>
              <div className={classInValidComment}>
                <label>
                  <span className="custom-textarea__label">
                    Комментарий
                    <svg width={9} height={9} aria-hidden="true">
                      <use xlinkHref="#icon-snowflake" />
                    </svg>
                  </span>
                  <textarea
                    placeholder="Поделитесь своим опытом покупки"
                    {...userComment}
                  />
                </label>
                {errors.userComment && (
                    <div className="custom-textarea__error">
                    Нужно добавить комментарий
                  </div>
                )}
              </div>
            </div>
            <button
              className="btn btn--purple form-review__btn"
              type="submit"
            >
              Отправить отзыв
            </button>
          </form>
        </div>
    </PopUpMain>

    );
}

export { PopUpAddReview };

