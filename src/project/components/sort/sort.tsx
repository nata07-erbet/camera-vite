import { useState } from 'react';
import { SORT_INNER, SortInnerMap, DEFAULT_TAB_SORT, SortOrderMap, SORT_ORDER, DEFAULT_TAB_SORT_ORDER } from '../../const/const';
import { TSortInner, TSortOrder } from '../../types/types';

function Sort() {
  const [ currentTab, setCurrentTab ] = useState<TSortInner>(DEFAULT_TAB_SORT);
  const [ currentTabOrder, setCurrentTabOrder ] = useState<TSortOrder>(DEFAULT_TAB_SORT_ORDER);

  const handleClickInner = (tabInner: TSortInner) => {
    setCurrentTab(tabInner);
  };

  const handleClickOrder = (tabOrder:TSortOrder) => {
    setCurrentTabOrder(tabOrder);
  };

  return(
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>
          <div className="catalog-sort__type">
            {SORT_INNER. map((tabInner) => (
              <div className="catalog-sort__btn-text" key={tabInner}>
                <input
                  type="radio"
                  id={tabInner}
                  name="sort"
                  checked={currentTab === tabInner}
                  onClick={() => handleClickInner(tabInner)}
                />
                <label htmlFor={tabInner}>{SortInnerMap[tabInner]}</label>
              </div>
            ))}
          </div>
          <div className="catalog-sort__order">
            {SORT_ORDER.map((tabOrder) => (
              <div className={`catalog-sort__btn catalog-sort__btn--${tabOrder}`} key={tabOrder}>
                <input
                  type="radio"
                  id={tabOrder}
                  name="sort-icon"
                  checked={currentTabOrder === tabOrder}
                  aria-label={SortOrderMap[tabOrder]}
                  onClick={() => handleClickOrder(tabOrder)}
                />
                <label htmlFor={tabOrder}>
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
