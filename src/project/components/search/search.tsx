import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { SearchList } from '../search-list/search-list';
import { TCamera } from '../../types/types';

type SearchProps = {
cameras: TCamera[];
};

function Search({ cameras }: SearchProps) {
  const [ inputItems, setInputItems ] = useState('');
  const [ listCameras, setListCameras ] = useState<TCamera[]>([]);

  const isOpened = !!(inputItems && inputItems.length >= 1);

  const classOpened = classNames('form-search', {'list-opened': isOpened});

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputItems(evt.target.value);
  };

  const handleResetClick = () => {
    setInputItems('');
  };

  const filterCameras = (inputValue:string, products:TCamera[]) => {
    if(!inputValue) {
      return [];
    }

    const camerasList = products.filter((product) => product.name.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()));

    return camerasList;
  };

  useEffect(() => {
    let isMounted = true;
    if(isMounted) {
      const sortedCameras = filterCameras(inputItems, cameras);
      setListCameras(sortedCameras);
    }

    return () => {
      isMounted = false;
    };
  },[inputItems,cameras]);


  return(
    <>
      <div className={classOpened} data-testid='search'>
        <form>
          <label>
            <svg
              className="form-search__icon"
              width={16}
              height={16}
              aria-hidden="true"
            >
              <use xlinkHref="#icon-lens" />
            </svg>
            <input
              className="form-search__input"
              type="text"
              autoComplete="off"
              placeholder="Поиск по сайту"
              value={inputItems}
              onChange={handleInput}
            />
          </label>
          {cameras && inputItems.length >= 3 && <SearchList cameras={listCameras}/>}
        </form>
        <button
          className="form-search__reset"
          type="reset"
          onClick={handleResetClick}
        >
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
          <span className="visually-hidden">Сбросить поиск</span>
        </button>
      </div>
    </>
  );
}

export { Search };
