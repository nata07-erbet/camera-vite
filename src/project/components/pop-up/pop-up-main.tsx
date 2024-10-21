import { useCallback, useEffect, } from 'react';
import classnames from 'classnames';
import { PropsWithChildren } from 'react';


type PopUpMainProps = PropsWithChildren<{
  isActive: boolean;
  onClose?: () => void;
}>


function PopUpMain({ isActive, onClose, children }: PopUpMainProps) {

  const handleEscDownClick = useCallback(
    (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose?.();
      }
    }, [onClose]
  );

  const handleCloseButtonClick = () => {
    onClose?.();
  };

  const handleOverLayClick = () => {
    onClose?.();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleEscDownClick);

    return (() => document.removeEventListener('keydown', handleEscDownClick));
  }, [handleEscDownClick]);

  useEffect(() => {
    let isMounted = true;

    if (isActive && isMounted) {
      document.body.classList.add('scroll-lock');
    }

    return(() => {
      document.body.classList.remove('scroll-lock');
      isMounted = false;
    });
  }, [isActive]);

  return (
    <div
      className={classnames(
        'modal',
        { 'is-active': isActive }
      )}
      data-testid= 'modal-window'
    >
      <div className="modal__wrapper">
        <div
          className="modal__overlay"
          onClick={handleOverLayClick}
        />
        <div className="modal__content">
          {children}
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={handleCloseButtonClick}
          >
            <svg width={10} height={10} aria-hidden="true">
              <use xlinkHref="#icon-close" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export type { PopUpMainProps };
export { PopUpMain };
