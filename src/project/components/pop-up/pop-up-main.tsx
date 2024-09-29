import { PropsWithChildren } from 'react';
import classnames from 'classnames';

type PopUpMainProps = PropsWithChildren<{
  isActive: boolean;
  onClose?: () => void;
}>


function PopUpMain({ isActive, onClose, children }: PopUpMainProps) {

  const handleEscDownClick = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape') {
      onClose?.();
    }
  };

  document.addEventListener('keydown', handleEscDownClick);

  const handleCloseButtonClick = () => {
    onClose?.();
  };

  return (
    <div className={classnames(
      'modal',
      { 'is-active': isActive }
    )}
    >
      <div className="modal__wrapper">
        <div className="modal__overlay" />
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

export { PopUpMain };
