import { useState } from 'react';
import { MouseEvent } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { TCamera } from '../../types/types';
import { PaginationButton } from '../../const/const'
import { usePangination } from '../../hooks/use-pangination';


type PaginationProps = {
  amountCatalogPages: number;
  currentPage: number;
  onPageChange: () => void;
};

function Pagination({ amountCatalogPages, currentPage,  onPageChange }: PaginationProps) {
  const { prevPage, nextPage, setPage  } = usePangination({ amountCatalogPages, currentPage,  onPageChange});

  const currentRangeMock = [1, 2, 3];
  const currentPageMock  = 2;

  const handlePageClick = (page: number) => {
    setPage(page);
  };

  const handlePrevClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    handlePageClick(prevPage);

  };

  const handleNextClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    handlePageClick(nextPage);
  };


  return(
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

        {currentRangeMock.map((page) =>(
          <li className="pagination__item">
          <Link
            className={classNames(
              'pagination__link',
              {'pagination__link--active': page === currentPageMock}
              )}
            to={'1'}>
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
