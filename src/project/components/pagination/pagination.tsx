import { useState } from 'react';
import { upDatePage } from '../../store/action';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { MouseEvent } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { TCamera } from '../../types/types';
import { PaginationButton, CATALOG_SHOW, AppRoutes } from '../../const/const';
import { usePangination } from '../../hooks/use-pangination';

function Pagination() {
  const dispatch = useAppDispatch();

  const cameras = useAppSelector((state) => state.cameras);
  const currentPage = useAppSelector((state) => state.currentPage);

  const amountCatalogPages = Math.ceil(cameras.length / CATALOG_SHOW);

  const pages = Array.from(
    { length: amountCatalogPages },
    (_, index) => index + 1,
  );

  const handlePageClick = (page: number) => {
    dispatch(upDatePage(page));
  };

  const handlePrevClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
  };

  const handleNextClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <Link
            className="pagination__link pagination__link--text"
            to={''}
            onClick={handlePrevClick}
          >
            {PaginationButton.Prev}
          </Link>
        </li>

        {pages.map((page) => (
          <li className="pagination__item">
            <Link
              className={classNames('pagination__link', {
                'pagination__link--active': page === currentPage,
              })}
              // to={AppRoutes.M}
              onClick={() => handlePageClick(page)}
            >
              {page}
            </Link>
          </li>
        ))}

        <li className="pagination__item">
          <Link
            className="pagination__link pagination__link--text"
            to={'2'}
            onClick={handleNextClick}
          >
            {PaginationButton.Next}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export { Pagination };
