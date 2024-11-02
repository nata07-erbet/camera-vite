// import { Link } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { NavMap } from '../../const/const';
import { AppRoutes } from '../../const/const';
import { Search } from '../search/search';
import { TCamera } from '../../types/types';
import { ChangeEvent } from 'react';

type HeaderProps = {
  inputItems: string;
  cameras: TCamera[];
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void;
};

function Header({ inputItems, cameras, onChange }: HeaderProps) {
  return (
    <header className="header" id="header">
      <div className="container">
        <Link
          className="header__logo"
          to={AppRoutes.Main}
          aria-label="Переход на главную"
        >
          <svg width={100} height={36} aria-hidden="true">
            <use xlinkHref="#icon-logo" />
          </svg>
        </Link>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            {Object
              .values(NavMap)
              .map((item) => (
                <li
                  key={item}
                  className="main-nav__item"
                >
                  <NavLink className="main-nav__link" to="#">
                    {item}
                  </NavLink>
                </li>
              ))}
          </ul>
        </nav>
        <Search
          inputItems={inputItems}
          cameras={cameras}
          onChange={onChange}
        />
      </div>
    </header>
  );
}

export { Header };

