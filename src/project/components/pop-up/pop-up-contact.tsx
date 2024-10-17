import { useRef, useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import FocusLock from 'react-focus-lock';
import { useHookFormMask } from 'use-mask-input';
import { ErrorMessage } from '@hookform/error-message';

import { PopUpMain } from '../pop-up/pop-up-main';
import { PopUpMainProps } from '../pop-up/pop-up-main';
import { TCamera, TOrder } from '../../types/types';

import { api } from '../../api/api';

type PopUpContactProps = PopUpMainProps & {
  cameraByBasket: TCamera;
};

function PopUpContact({ cameraByBasket, ...props }: PopUpContactProps) {
  const focusFirst = useRef<HTMLInputElement | null>(null);

  const id = cameraByBasket.id;

  type TFormInputs = {
    camerasIds: number;
    coupon?: string;
    tel: string;
  };

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    mode: 'all',
  });

  const registerWithMask = useHookFormMask(register);

  const handleSubmitData: SubmitHandler<TFormInputs> = (data) => {
    const formData: TOrder = {
      camerasIds: [id],
      coupon: data.coupon,
      tel: data.tel
    };

    api
      .post('/orders', formData)
      .catch((err) => setError('root', err))
  };

  useEffect(() => {
    if (focusFirst.current) {
      focusFirst.current.focus();
    }
  }, []);

  return (
    <FocusLock>
      <PopUpMain {...props}>
        <p className="title title--h4">Свяжитесь со мной</p>
        <div className="basket-item basket-item--short">
          <div className="basket-item__img">
            <picture>
              <source
                type="image/webp"
                srcSet={cameraByBasket.previewImgWebp}
              />
              <img
                src={cameraByBasket.previewImg}
                srcSet={cameraByBasket.previewImg2x}
                width={140}
                height={120}
                alt={cameraByBasket.name}
              />
            </picture>
          </div>
          <div className="basket-item__description">
            <p className="basket-item__title">{cameraByBasket.name}</p>
            <ul className="basket-item__list">
              <li className="basket-item__list-item">
                <span className="basket-item__article">Артикул:</span>{''}
                <span className="basket-item__number">{cameraByBasket.id}</span>
              </li>
              <li className="basket-item__list-item">Плёночная фотокамера</li>
              <li className="basket-item__list-item">Любительский уровень</li>
            </ul>
            <p className="basket-item__price">
              <span className="visually-hidden">Цена:</span>{cameraByBasket.price}₽
            </p>
          </div>
        </div>
        <div className="custom-input form-review__item">
          <label>
            <span className="custom-input__label">
              Телефон
              <svg width={9} height={9} aria-hidden="true">
                <use xlinkHref="#icon-snowflake" />
              </svg>
            </span>
            <input
              {...registerWithMask('tel', ['99 9999-9999', '99999-9999'], {
                required: true,
                pattern: {
                  value: /\+7\(\d{3}\)\d{3}-\d{2}-\d{2}/,
                  message: 'Telephone number is invalid'
                }
              })}
              type="tel"
              placeholder="Введите ваш номер"
              ref={focusFirst}

            />
            <ErrorMessage
              name='tel_invalid'
              errors={errors}
              render={({ message }) => <p>{message}</p>}
            />
          </label>
          <p className="custom-input__error">Нужно указать номер</p>
        </div>
        <div className="modal__buttons">
          <button
            className="btn btn--purple modal__btn modal__btn--fit-width"
            type="button"
            onClick={(evt) => handleSubmit(handleSubmitData)(evt)}
          >
            <svg width={24} height={16} aria-hidden="true">
              <use xlinkHref="#icon-add-basket" />
            </svg>
            Заказать
          </button>
        </div>
      </PopUpMain>
    </FocusLock>
  );
}

export { PopUpContact };
