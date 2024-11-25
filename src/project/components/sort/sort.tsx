import { useState } from 'react';
import { SORT_INNER, SortInnerMap, SortOrderMap, SORT_ORDER, DEFAULT_SORT_TYPE, DEFAULT_SORT_DIRECTION } from '../../const/const';
import { TSortType, TSortDirection } from '../../types/types';

type SortProps = {
  onClickType: (type: TSortType) => void;
  onClickDirection: (direction: TSortDirection) => void;
};

function Sort({ onClickType, onClickDirection }: SortProps) {
  const [ currentTab, setCurrentTab ] = useState<TSortType>(DEFAULT_SORT_TYPE);
  const [ currentDirection, setCurrentTabOrder ] = useState<TSortDirection>(DEFAULT_SORT_DIRECTION);

  const handleClickType = (type: TSortType) => {
    setCurrentTab(type);
    onClickType(type);
  };

  const handleClickDirection = (direction:TSortDirection) => {
    setCurrentTabOrder(direction);
    onClickDirection(direction);
  };

  return(
    <div className="catalog-sort" data-testid="sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {SORT_INNER. map((type) => (
              <div className="catalog-sort__btn-text" key={type}>
                <input
                  type="radio"
                  id={type}
                  name="sort"
                  checked={currentTab === type}
                  onClick={() => handleClickType(type)}
                />
                <label htmlFor={type}>{SortInnerMap[type]}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {SORT_ORDER.map((direction) => (
              <div className={`catalog-sort__btn catalog-sort__btn--${direction}`} key={direction}>
                <input
                  type="radio"
                  id={direction}
                  name="sort-icon"
                  checked={currentDirection === direction}
                  aria-label={SortOrderMap[direction]}
                  onClick={() => handleClickDirection(direction)}
                />
                <label htmlFor={direction}>
                  <svg width={16} height={14} aria-hidden="true">
                    <use xlinkHref="#icon-sort" />
                  </svg>
                </label>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
}

export { Sort };
