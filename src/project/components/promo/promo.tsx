import { useForm } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/index';
import { postCoupon } from '../../store/api-actions';
import { TPromoCoupon } from '../../types/types';
import { ErrorMessage } from '@hookform/error-message';

type TInputData = {
  promo: string;
};

function Promo() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TInputData>({
    mode: 'all',
  });

  const couponInput = register('promo', {
    required: {
      value: true,
      message: 'Coupon number is required',
    },
    pattern: {
      value: /^[а-яА-ЯёЁa-zA-Z0-9]{10,160}$/, // как пример
      message:
        'Поле промокода принимает промокод только в одно слово и не должно принимать пробелы',
    },
  });

  const onFormSubmit = (data: TInputData) => {
    const coupon: TPromoCoupon = {
      coupon: data.promo,
    };

    dispatch(postCoupon(coupon));
  };

  return (
    <>
      <div className="basket__promo" data-testid="promo">
        <p className="title title--h4">
          Если у вас есть промокод на скидку, примените его в этом поле
        </p>
        <div className="basket-form">
          <form action="#" method="post" onSubmit={handleSubmit(onFormSubmit)}>
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
                    name="promo"
                    errors={errors}
                    render={({ message }) => <p>{message}</p>}
                  />
                )}
              </label>
              {sendingStatus === isError && (
                <p className="custom-input__error">Промокод неверный</p>
              )}
              {sendingStatus === isSuccess && (
                <p className="custom-input__success">Промокод принят!</p>
              )}
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
