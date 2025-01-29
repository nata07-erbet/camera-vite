import { fetchCamera } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';

import { Link } from 'react-router-dom';
import { TCamera } from '../../types/types';
import { AppRoutes } from '../../const/const';
import { useEffect } from 'react';

type BreadcrumbsProps = {
  cameraId: TCamera['id'] | null;
  isBasketPage: boolean;
};

function Breadcrumbs({cameraId, isBasketPage }: BreadcrumbsProps) {
  const dispatch = useAppDispatch();

  const camera = useAppSelector((state) => state.camera)

  useEffect(() => {
    if(cameraId) {
      dispatch(fetchCamera(cameraId));
    }
  }, []);

  return (
    <div className="breadcrumbs">
      <div className="container">
        {!camera ? (
          <ul className="breadcrumbs__list" data-testid="breadcrumbs-list">
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={AppRoutes.Main}>
                Главная
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <span className="breadcrumbs__link breadcrumbs__link--active">
                {isBasketPage ? 'Корзина' : 'Каталог'}
              </span>
            </li>
          </ul>
        ) : (
          <ul className="breadcrumbs__list" data-testid="breadcrumbs-list">
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={AppRoutes.Main}>
                Главная
                <svg width={5} height={8} aria-hidden="true">
                  <use xlinkHref="#icon-arrow-mini" />
                </svg>
              </Link>
            </li>
            <li className="breadcrumbs__item">
              <Link className="breadcrumbs__link" to={AppRoutes.Main}>
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
