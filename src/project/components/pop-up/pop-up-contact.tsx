import { useRef, useEffect, FormEventHandler } from 'react';
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
  onSubmit: () => void;
};

function PopUpContact({
  cameraByBasket,
  onSubmit,
  ...props
}: PopUpContactProps) {

  type TFormInputs = {
    camerasIds: number;
    coupon?: string;
    tel: string;
  };

  const inputRef = useRef<HTMLInputElement | null>(null);

  const id = cameraByBasket.id;

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<TFormInputs>({
    mode: 'all',
  });

  const registerWithMask = useHookFormMask(register);

  const telInput = registerWithMask('tel', ['+7 (999) 999-99-99'], {
    required: {
      value: true,
      message: 'Telephone number is required',
    },
    pattern: {
      value: /\+7\s\(9\d{2}\)\s\d{3}-\d{2}-\d{2}/,
      message: 'Telephone number is invalid',
    },
  });
  const postprocessTelValue = (value: string) =>
    value.replace(/([^+0123456789])/g, '');

  const handleSubmitData: SubmitHandler<TFormInputs> = (data) => {

    const formData: TOrder = {
      camerasIds: [id],
      coupon: data.coupon,
      tel: postprocessTelValue(data.tel),
    };

    api
      .post('/orders', formData)
      .then(onSubmit)
      .catch((err: Error) => setError('root', { 'message': err.message}));
  };

  useEffect(() => {
    if(inputRef.current) {
      telInput.ref(inputRef.current);
      inputRef.current.focus();
    }
  },[telInput]);

  return (
    <FocusLock>
      <PopUpMain {...props}>
        <form onSubmit={handleSubmit(handleSubmitData) as FormEventHandler}>
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
                  <span className="basket-item__article">Артикул:</span>
                  {''}
                  <span className="basket-item__number">
                    {cameraByBasket.id}
                  </span>
                </li>
                <li className="basket-item__list-item">Плёночная фотокамера</li>
                <li className="basket-item__list-item">Любительский уровень</li>
              </ul>
              <p className="basket-item__price">
                <span className="visually-hidden">Цена:</span>
                {cameraByBasket.price}₽
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
                {...telInput}
                placeholder="Введите ваш номер"
                data-testid="telElement"
              />
              {errors.tel && (
                <ErrorMessage
                  name="tel"
                  errors={errors}
                  render={({ message }) => <p>{message}</p>}
                />
              )}
            </label>
            <p className="custom-input__error">Нужно указать номер</p>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="submit"
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Заказать
            </button>
          </div>
        </form>
      </PopUpMain>
    </FocusLock>
  );
}
export { PopUpContact };
