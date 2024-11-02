import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { SearchList } from '../search-list/search-list';
import { TCamera } from '../../types/types';
import { ChangeEvent } from 'react';

type SearchProps = {
  inputItems: string;
  cameras: TCamera[];
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

function Search({ inputItems, cameras, onChange }: SearchProps) {
  const isOpened = inputItems.length >= 3 ? true : false;

  const classOpened = classNames('form-search', {'list-opened': isOpened});

  const handleInput = (evt: ChangeEvent<HTMLInputElement>) => {
    onChange(evt);
  };

  return(
    <>
      <div className={classOpened}>
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
              onChange={handleInput}
            />
          </label>
          <SearchList
            cameras={cameras}
          />
        </form>
        <button className="form-search__reset" type="reset">
          <svg width={10} height={10} aria-hidden="true">
            <use xlinkHref="#icon-close" />
          </svg>
          <span className="visually-hidden">Сбросить поиск</span>
        </button>
      </div>
      <Link className="header__basket-link" to="#">
        <svg width={16} height={16} aria-hidden="true">
          <use xlinkHref="#icon-basket" />
        </svg>
      </Link>
    </>
  );
}

export { Search };
