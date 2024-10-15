import { MouseEvent } from 'react';
import { Link } from 'react-router-dom';

type UpBtnProps = {
  onScrollTop: () => void;
};

function UpBtn({ onScrollTop }: UpBtnProps) {

  const handleClickButtonUp = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    onScrollTop();
  };

  return (
    <Link
      className="up-btn"
      to="#"
      onClick={handleClickButtonUp}
    >
      <svg width={12} height={18} aria-hidden="true">
        <use xlinkHref="#icon-arrow2" />
      </svg>
    </Link>
  );
}

export { UpBtn };

