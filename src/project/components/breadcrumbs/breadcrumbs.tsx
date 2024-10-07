import { Link } from 'react-router-dom';
import { TCamera } from '../../types/types';
import { AppRoutes } from '../../const/const';

type BreadcrumbsProps = {
  camera?: TCamera;
};

function Breadcrumbs({ camera }: BreadcrumbsProps) {

  return (
    <div className="breadcrumbs">
      <div className="container">
        {!camera
          ? (
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link className="breadcrumbs__link"
                  to={AppRoutes.Main}
                >
                  Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  Каталог
                </span>
              </li>
            </ul>
          ) :
          (
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link
                  className="breadcrumbs__link"
                  to={AppRoutes.Main}
                >
                  Главная
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <Link
                  className="breadcrumbs__link"
                  to={AppRoutes.Main}
                >
                  Каталог
                  <svg width={5} height={8} aria-hidden="true">
                    <use xlinkHref="#icon-arrow-mini" />
                  </svg>
                </Link>
              </li>
              <li className="breadcrumbs__item">
                <span className="breadcrumbs__link breadcrumbs__link--active">
                  {camera.name}
                </span>
              </li>
            </ul>
          )}
      </div>
    </div>
  );
}

export { Breadcrumbs };
