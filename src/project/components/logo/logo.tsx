import { Link } from 'react-router-dom';
import { AppRoutes } from '../../const/const';

function Logo() {
  return (
    <Link
      className="header__logo"
      to={AppRoutes.Main}
      aria-label="Переход на главную"
    >
      <svg width={100} height={36} aria-hidden="true">
        <use xlinkHref="#icon-logo" />
      </svg>
    </Link>
  );
}

export { Logo };
