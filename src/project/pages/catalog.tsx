import { useState, useEffect } from 'react';
import { api } from '../api/api';
import { TCamera, TPromo } from '../types/types';
import { ReqRoutes } from '../const/const';
import { Header } from '../components/header/header';
import { Banner } from '../components/banner/banner';
import { ProductsList } from '../components/products-list/products-list'

function Catalog() {
  const [cameras, setCameras] = useState<TCamera[] | null>([]);
  const [promos, setPromos] = useState<TPromo[] | null>([]);

  useEffect(() => {
    api
      .get<TCamera[]>(`${ReqRoutes.Cameras}`)
      .then((response) => setCameras(response.data));

    api
      .get<TCamera[]>(`${ReqRoutes.Promo}`)
      .then((response) => setPromos(response.data));
  }, []);


  return (
    <div className="wrapper">
      <Header />
      <main>
        {promos && promos
          .map((promo) => <Banner key={promo.id} camera={promo} />)
        }
        <div className="page-content">
          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">
                    Главная
                    <svg width={5} height={8} aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini" />
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item">
                  <span className="breadcrumbs__link breadcrumbs__link--active">
                    Каталог
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img src="img/banner.png" />
                  {/*<div class="catalog-filter">
              <form action="#">
                <h2 class="visually-hidden">Фильтр</h2>
                <fieldset class="catalog-filter__block">
                  <legend class="title title&#45;&#45;h5">Цена, ₽</legend>
                  <div class="catalog-filter__price-range">
                    <div class="custom-input">
                      <label>
                        <input type="number" name="price" placeholder="от">
                      </label>
                    </div>
                    <div class="custom-input">
                      <label>
                        <input type="number" name="priceUp" placeholder="до">
                      </label>
                    </div>
                  </div>
                </fieldset>
                <fieldset class="catalog-filter__block">
                  <legend class="title title&#45;&#45;h5">Категория</legend>
                  <div class="custom-radio catalog-filter__item">
                    <label>
                      <input type="radio" name="category" value="photocamera" checked><span class="custom-radio__icon"></span><span class="custom-radio__label">Фотокамера</span>
                    </label>
                  </div>
                  <div class="custom-radio catalog-filter__item">
                    <label>
                      <input type="radio" name="category" value="videocamera"><span class="custom-radio__icon"></span><span class="custom-radio__label">Видеокамера</span>
                    </label>
                  </div>
                </fieldset>
                <fieldset class="catalog-filter__block">
                  <legend class="title title&#45;&#45;h5">Тип камеры</legend>
                  <div class="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="digital" checked><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Цифровая</span>
                    </label>
                  </div>
                  <div class="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="film" disabled><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Плёночная</span>
                    </label>
                  </div>
                  <div class="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="snapshot"><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Моментальная</span>
                    </label>
                  </div>
                  <div class="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="collection" checked disabled><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Коллекционная</span>
                    </label>
                  </div>
                </fieldset>
                <fieldset class="catalog-filter__block">
                  <legend class="title title&#45;&#45;h5">Уровень</legend>
                  <div class="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="zero" checked><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Нулевой</span>
                    </label>
                  </div>
                  <div class="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="non-professional"><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Любительский</span>
                    </label>
                  </div>
                  <div class="custom-checkbox catalog-filter__item">
                    <label>
                      <input type="checkbox" name="professional"><span class="custom-checkbox__icon"></span><span class="custom-checkbox__label">Профессиональный</span>
                    </label>
                  </div>
                </fieldset>
                <button class="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
                </button>
              </form>
            </div>*/}
                </div>
                <div className="catalog__content">
                  {/*<div class="catalog-sort">
              <form action="#">
                <div class="catalog-sort__inner">
                  <p class="title title&#45;&#45;h5">Сортировать:</p>
                  <div class="catalog-sort__type">
                    <div class="catalog-sort__btn-text">
                      <input type="radio" id="sortPrice" name="sort" checked>
                      <label for="sortPrice">по цене</label>
                    </div>
                    <div class="catalog-sort__btn-text">
                      <input type="radio" id="sortPopular" name="sort">
                      <label for="sortPopular">по популярности</label>
                    </div>
                  </div>
                  <div class="catalog-sort__order">
                    <div class="catalog-sort__btn catalog-sort__btn&#45;&#45;up">
                      <input type="radio" id="up" name="sort-icon" checked aria-label="По возрастанию">
                      <label for="up">
                        <svg width="16" height="14" aria-hidden="true">
                          <use xlink:href="#icon-sort"></use>
                        </svg>
                      </label>
                    </div>
                    <div class="catalog-sort__btn catalog-sort__btn&#45;&#45;down">
                      <input type="radio" id="down" name="sort-icon" aria-label="По убыванию">
                      <label for="down">
                        <svg width="16" height="14" aria-hidden="true">
                          <use xlink:href="#icon-sort"></use>
                        </svg>
                      </label>
                    </div>
                  </div>
                </div>
              </form>
            </div>*/}
                {cameras &&   <ProductsList cameras ={cameras} />}
                  {/*<div class="pagination">
              <ul class="pagination__list">
                <li class="pagination__item"><a class="pagination__link pagination__link&#45;&#45;active" href="1">1</a>
                </li>
                <li class="pagination__item"><a class="pagination__link" href="2">2</a>
                </li>
                <li class="pagination__item"><a class="pagination__link" href="3">3</a>
                </li>
                <li class="pagination__item"><a class="pagination__link pagination__link&#45;&#45;text" href="2">Далее</a>
                </li>
              </ul>
            </div>*/}
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer__info">
            <a
              className="footer__logo"
              href="index.html"
              aria-label="Переход на главную"
            >
              <svg width={100} height={36} aria-hidden="true">
                <use xlinkHref="#icon-logo-mono" />
              </svg>
            </a>
            <p className="footer__description">
              Интернет-магазин фото- и видеотехники
            </p>
            <ul className="social">
              <li className="social__item">
                <a
                  className="link"
                  href="#"
                  aria-label="Переход на страницу вконтатке"
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-vk" />
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a
                  className="link"
                  href="#"
                  aria-label="Переход на страницу pinterest"
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-pinterest" />
                  </svg>
                </a>
              </li>
              <li className="social__item">
                <a
                  className="link"
                  href="#"
                  aria-label="Переход на страницу reddit"
                >
                  <svg width={20} height={20} aria-hidden="true">
                    <use xlinkHref="#icon-reddit" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
          <ul className="footer__nav">
            <li className="footer__nav-item">
              <p className="footer__title">Навигация</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                    Каталог
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Гарантии
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Доставка
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    О компании
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Ресурсы</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                    Курсы операторов
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Блог
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Сообщество
                  </a>
                </li>
              </ul>
            </li>
            <li className="footer__nav-item">
              <p className="footer__title">Поддержка</p>
              <ul className="footer__list">
                <li className="footer__item">
                  <a className="link" href="#">
                    FAQ
                  </a>
                </li>
                <li className="footer__item">
                  <a className="link" href="#">
                    Задать вопрос
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </footer>
    </div>

  );
}

export { Catalog };

