import { FormEvent, useRef } from 'react';
import { useAppDispatch } from '../../hooks/index';
import { loginAction } from '../../store/api-actions';
import { PopUpMain, PopUpMainProps } from './pop-up-main';
type PopUpLoginProps = PopUpMainProps & {};

function PopUpLogin({ ...props }: PopUpLoginProps) {
  const dispatch = useAppDispatch();

  const inputLoginRef = useRef<HTMLInputElement>(null);
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const handleSubmitButton = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (inputLoginRef.current !== null && inputPasswordRef.current !== null) {
      const formData = {
        login: inputLoginRef.current.value,
        password: inputPasswordRef.current.value,
      };
      dispatch(loginAction(formData));
    }
  };
  return (
    <>
      <PopUpMain {...props}>
        <form onSubmit={handleSubmitButton}>
          <p className="title title--h4">Login</p>
          <div className="custom-input form-review__item">
            <label>
              <span className="custom-input__label">
                Login
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                type="text"
                name="login"
                placeholder="Введите ваш login"
                ref={inputLoginRef}
              />
            </label>
            <label>
              <span className="custom-input__label">
                Password
                <svg width={9} height={9} aria-hidden="true">
                  <use xlinkHref="#icon-snowflake" />
                </svg>
              </span>
              <input
                type="text"
                name="password"
                placeholder="Введите ваш password"
                ref={inputPasswordRef}
              />
            </label>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="submit"
            >
              <svg width={24} height={16} aria-hidden="true">
                <use xlinkHref="#icon-add-basket" />
              </svg>
              Send
            </button>
          </div>
        </form>
      </PopUpMain>
    </>
  );
}

export { PopUpLogin };
