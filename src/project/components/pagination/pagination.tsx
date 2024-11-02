import { useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { TCamera } from '../../types/types';

type PaginationProps = {
  cameras: TCamera[];
};

function Pagination({ cameras }: PaginationProps) {
  const amountCatalogPages = Math.ceil(cameras.length / 9);
  const NUMBERS = Array.from({ length: amountCatalogPages }, (_, i) => i + 1);
  const [ currentPage ] = useState(0);
  const [start, setStart] = useState(0);
  const end = start + 3;

  const initialStateNext = true;
  const initialStatePrev = false;

  const [ isActiveNext, setIsActiveNext ] = useState(initialStateNext);
  const [ isActivePrev, setIsActivePrev ] = useState(initialStatePrev);

  const classShowNext = classNames(
    'pagination__link',
    'pagination__link--text',
    'pagination__link--next',
    {'visually-hidden': !isActiveNext}
  );

  const classShowPrev = classNames(
    'pagination__link',
    'pagination__link--text',
    'pagination__link--prev',
    {'visually-hidden': !isActivePrev }
  );

  const handleNextClick = () => {
    setStart((prevState) => prevState + 3);
    setIsActivePrev(true);

    if(currentPage === amountCatalogPages) {
      setIsActiveNext(false);
    }
  };

  const handlePrevClick = () => {
    setStart((prevState) => prevState - 3);
  };

  return(
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <Link
            className={classShowPrev}
            to={''}
            onClick={handlePrevClick}
          >
            Назад
          </Link>
        </li>
        {NUMBERS
          .slice(start, end)
          .map((count) => (
            <li className="pagination__item" key={count}>
              <Link className="pagination__link" to={''}>
                {(currentPage + count)}
              </Link>
            </li>
          ))}
        {amountCatalogPages >= 3 ? (
          <li className="pagination__item">
            <Link
              className={classShowNext}
              to={''}
              onClick={handleNextClick}
            >
              Далее
            </Link>
          </li>
        ) : ''}
      </ul>
    </div>
  );
}

export { Pagination };
