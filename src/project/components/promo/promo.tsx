import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { api } from '../../api/api';
import { ReqRoutes, RequestStatus } from '../../const/const';
import { TPromoCoupon } from '../../types/types';
import { Spinner } from '../spinner/spinner';
import { ErrorMessage } from '@hookform/error-message';

type PromoProps = {
  onSubmit: () => void;
};

type TInputData = {
  promo: string;
};

function Promo({ onSubmit }: PromoProps) {
  const [sendingStatus, setSendingStatus ] = useState();
  const isSending = sendingStatus === RequestStatus.Pending;
  const isSuccess = sendingStatus === RequestStatus.Success;
  const isError = sendingStatus === RequestStatus.Error;

  const {
  register,
  handleSubmit,
  formState: {errors},
  setError
} = useForm<TInputData>({
  mode: 'all'
});

  const couponInput = register('promo', {
    required: {
      value: true,
      message: 'Coupon number is required'
    },
    pattern: {
      value:  /^[а-яА-ЯёЁa-zA-Z0-9]{10,160}$/, // как пример
      message: 'Поле промокода принимает промокод только в одно слово и не должно принимать пробелы',
    }
  });

  const onFormSubmit = (data: TInputData) => {
    const couponData: TPromoCoupon = {
      coupon: data.promo
    };

    api
      .post(ReqRoutes.Promo, couponData)
      .then((response) => {
        onSubmit;
        setSendingStatus(RequestStatus.Success);
      })
      .catch((err: Error) => {
        setError('root',{ 'message': err.message });
        setSendingStatus(RequestStatus.Error);
      });

  };
    return(
      <>
        {isSending && <Spinner />}
        <div className="basket__promo">
        <p className="title title--h4">
          Если у вас есть промокод на скидку, примените его в этом поле
        </p>
        <div className="basket-form">
          <form
            action="#"
            method="post"
            onSubmit={handleSubmit(onFormSubmit)}
          >
          <div className="custom-input">
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                type="text"
                placeholder="Введите промокод"
                {...couponInput}
              />
              {errors.promo && (
                <ErrorMessage
                  name='promo'
                  errors={errors}
                  render={({ message }) => <p>{message}</p>}
                />
              )}
            </label>
            {sendingStatus === isError && <p className="custom-input__error">Промокод неверный</p> }
            { sendingStatus === isSuccess && <p className="custom-input__success">Промокод принят!</p>}
          </div>
            <button className="btn" type="submit">
              Применить
            </button>
          </form>
        </div>
        </div>
      </>
  );
}

export { Promo };
