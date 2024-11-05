// import { Link } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import { NavMap } from '../../const/const';
import { AppRoutes } from '../../const/const';
import { Search } from '../search/search';
import { TCamera } from '../../types/types';

type HeaderProps = {
  cameras: TCamera[];
};

function Header({ cameras }: HeaderProps) {
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
        <Search cameras={cameras}/>
      </div>
    </header>
  );
}

export { Header };

