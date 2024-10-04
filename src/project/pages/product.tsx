import { useEffect, useState } from 'react';
import { api } from '../api/api';
import { ReqRoutes } from '../const/const';
import { TCamera } from '../types/types';
import { Logo } from '../components/logo/logo';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { Rate } from '../components/rate/rate';
import { UpBtn } from '../components/up-btn/up-btn';
import { Reviews } from '../components/reviews-list/reviews-list';
import { Footer } from '../components/footer/footer';

function Product() {

  const [cameras, setCameras] = useState<TCamera[]>([]);

  useEffect(() => {
    api
      .get<TCamera[]>(`${ReqRoutes.Cameras}`)
      .then((response) => setCameras(response.data));
  }, []);

  const currentCamera = cameras.find((camera) => camera.id === 13);

  return (
    <div className="wrapper">
      <header className="header" id="header">
        <div className="container">
          <Logo />
          <nav className="main-nav header__main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <a className="main-nav__link" href="catalog.html">
                  Каталог
                </a>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
                  Гарантии
                </a>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
                  Доставка
                </a>
              </li>
              <li className="main-nav__item">
                <a className="main-nav__link" href="#">
                  О компании
                </a>
              </li>
            </ul>
          </nav>
          {/*<div class="form-search">
      <form>
        <label>
          <svg class="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlink:href="#icon-lens"></use>
          </svg>
          <input class="form-search__input" type="text" autocomplete="off" placeholder="Поиск по сайту">
        </label>
        <ul class="form-search__select-list">
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 8i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 7i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 6i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 5i</li>
          <li class="form-search__select-item" tabindex="0">Cannonball Pro MX 4i</li>
        </ul>
      </form>
      <button class="form-search__reset" type="reset">
        <svg width="10" height="10" aria-hidden="true">
          <use xlink:href="#icon-close"></use>
        </svg><span class="visually-hidden">Сбросить поиск</span>
      </button>
    </div><a class="header__basket-link" href="#">
      <svg width="16" height="16" aria-hidden="true">
        <use xlink:href="#icon-basket"></use>
      </svg><span class="header__basket-count">3</span></a>*/}
        </div>
      </header>
      <main>
        {currentCamera && (
          <div className="page-content">
            <Breadcrumbs />
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={currentCamera.previewImgWebp}
                      />
                      <img
                        src={`/${currentCamera.previewImg}`}
                        srcSet={`/${currentCamera.previewImg2x}`}
                        width={560}
                        height={480}
                        alt={currentCamera.name}
                      />
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{currentCamera.name}</h1>
                    <Rate rate={currentCamera.rating} />
                    <p className="visually-hidden">Рейтинг: {currentCamera.rating}</p>
                    <p className="rate__count">
                      <span className="visually-hidden">Всего оценок:</span>{currentCamera.reviewCount}
                    </p>
                    <p className="product__price">
                      <span className="visually-hidden">Цена:</span>{currentCamera.price} ₽
                    </p>
                    <button className="btn btn--purple" type="button">
                      <svg width={24} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-add-basket" />
                      </svg>
                      Добавить в корзину
                    </button>
                    <div className="tabs product__tabs">
                      <div className="tabs__controls product__tabs-controls">
                        <button className="tabs__control" type="button">
                          Характеристики
                        </button>
                        <button className="tabs__control is-active" type="button">
                          Описание
                        </button>
                      </div>
                      <div className="tabs__content">
                        <div className="tabs__element">
                          <ul className="product__tabs-list">
                            <li className="item-list">
                              <span className="item-list__title">Артикул:</span>
                              <p className="item-list__text"> {currentCamera.id}</p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">Категория:</span>
                              <p className="item-list__text">Видеокамера</p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">Тип камеры:</span>
                              <p className="item-list__text">Коллекционная</p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">Уровень:</span>
                              <p className="item-list__text">Любительский</p>
                            </li>
                          </ul>
                        </div>
                        <div className="tabs__element is-active">
                          <div className="product__tabs-text">
                            <p>
                              Немецкий концерн BRW разработал видеокамеру Das Auge IV
                              в&nbsp;начале 80-х годов, однако она до&nbsp;сих пор
                              пользуется популярностью среди коллекционеров
                              и&nbsp;яростных почитателей старинной техники.
                            </p>
                            <p>
                              Вы&nbsp;тоже можете прикоснуться к&nbsp;волшебству
                              аналоговой съёмки, заказав этот чудо-аппарат. Кто знает,
                              может с&nbsp;Das Auge IV&nbsp;начнётся ваш путь
                              к&nbsp;наградам всех престижных кинофестивалей.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {/*<div class="page-content__section">
       <section class="product-similar">
         <div class="container">
           <h2 class="title title&#45;&#45;h3">Похожие товары</h2>
           <div class="product-similar__slider">
             <div class="product-similar__slider-list">
               <div class="product-card is-active">
                 <div class="product-card__img">
                   <picture>
                     <source type="image/webp" srcset="img/content/fast-shot.webp, img/content/fast-shot@2x.webp 2x"><img src="img/content/fast-shot.jpg" srcset="img/content/fast-shot@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5">
                   </picture>
                 </div>
                 <div class="product-card__info">
                   <div class="rate product-card__rate">
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-star"></use>
                     </svg>
                     <p class="visually-hidden">Рейтинг: 4</p>
                     <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>12</p>
                   </div>
                   <p class="product-card__title">Фотоаппарат FastShot MR-5</p>
                   <p class="product-card__price"><span class="visually-hidden">Цена:</span>18 970 ₽
                   </p>
                 </div>
                 <div class="product-card__buttons">
                   <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                   </button>
                   <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                   </a>
                 </div>
               </div>
               <div class="product-card is-active">
                 <div class="product-card__img">
                   <picture>
                     <source type="image/webp" srcset="img/content/das-auge.webp, img/content/das-auge@2x.webp 2x"><img src="img/content/das-auge.jpg" srcset="img/content/das-auge@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»">
                   </picture>
                 </div>
                 <div class="product-card__info">
                   <div class="rate product-card__rate">
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-star"></use>
                     </svg>
                     <p class="visually-hidden">Рейтинг: 3</p>
                     <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>23</p>
                   </div>
                   <p class="product-card__title">Ретрокамера «Das Auge IV»</p>
                   <p class="product-card__price"><span class="visually-hidden">Цена:</span>73 450 ₽
                   </p>
                 </div>
                 <div class="product-card__buttons">
                   <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                   </button>
                   <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                   </a>
                 </div>
               </div>
               <div class="product-card is-active">
                 <div class="product-card__img">
                   <picture>
                     <source type="image/webp" srcset="img/content/instaprinter.webp, img/content/instaprinter@2x.webp 2x"><img src="img/content/instaprinter.jpg" srcset="img/content/instaprinter@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2">
                   </picture>
                 </div>
                 <div class="product-card__info">
                   <div class="rate product-card__rate">
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <p class="visually-hidden">Рейтинг: 5</p>
                     <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>849</p>
                   </div>
                   <p class="product-card__title">Фотоаппарат Instaprinter P2</p>
                   <p class="product-card__price"><span class="visually-hidden">Цена:</span>8 430 ₽
                   </p>
                 </div>
                 <div class="product-card__buttons">
                   <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                   </button>
                   <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                   </a>
                 </div>
               </div>
               <div class="product-card">
                 <div class="product-card__img">
                   <picture>
                     <source type="image/webp" srcset="img/content/das-auge.webp, img/content/das-auge@2x.webp 2x"><img src="img/content/das-auge.jpg" srcset="img/content/das-auge@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»">
                   </picture>
                 </div>
                 <div class="product-card__info">
                   <div class="rate product-card__rate">
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-star"></use>
                     </svg>
                     <p class="visually-hidden">Рейтинг: 4</p>
                     <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>12</p>
                   </div>
                   <p class="product-card__title">Фотоаппарат FastShot MR-5</p>
                   <p class="product-card__price"><span class="visually-hidden">Цена:</span>18 970 ₽
                   </p>
                 </div>
                 <div class="product-card__buttons">
                   <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                   </button>
                   <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                   </a>
                 </div>
               </div>
               <div class="product-card">
                 <div class="product-card__img">
                   <picture>
                     <source type="image/webp" srcset="img/content/das-auge.webp, img/content/das-auge@2x.webp 2x"><img src="img/content/das-auge.jpg" srcset="img/content/das-auge@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»">
                   </picture>
                 </div>
                 <div class="product-card__info">
                   <div class="rate product-card__rate">
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-star"></use>
                     </svg>
                     <p class="visually-hidden">Рейтинг: 3</p>
                     <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>23</p>
                   </div>
                   <p class="product-card__title">Ретрокамера «Das Auge IV»</p>
                   <p class="product-card__price"><span class="visually-hidden">Цена:</span>73 450 ₽
                   </p>
                 </div>
                 <div class="product-card__buttons">
                   <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                   </button>
                   <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                   </a>
                 </div>
               </div>
               <div class="product-card">
                 <div class="product-card__img">
                   <picture>
                     <source type="image/webp" srcset="img/content/instaprinter.webp, img/content/instaprinter@2x.webp 2x"><img src="img/content/instaprinter.jpg" srcset="img/content/instaprinter@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2">
                   </picture>
                 </div>
                 <div class="product-card__info">
                   <div class="rate product-card__rate">
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <svg width="17" height="16" aria-hidden="true">
                       <use xlink:href="#icon-full-star"></use>
                     </svg>
                     <p class="visually-hidden">Рейтинг: 5</p>
                     <p class="rate__count"><span class="visually-hidden">Всего оценок:</span>849</p>
                   </div>
                   <p class="product-card__title">Фотоаппарат Instaprinter P2</p>
                   <p class="product-card__price"><span class="visually-hidden">Цена:</span>8 430 ₽
                   </p>
                 </div>
                 <div class="product-card__buttons">
                   <button class="btn btn&#45;&#45;purple product-card__btn" type="button">Купить
                   </button>
                   <a class="btn btn&#45;&#45;transparent" href="#">Подробнее
                   </a>
                 </div>
               </div>
             </div>
             <button class="slider-controls slider-controls&#45;&#45;prev" type="button" aria-label="Предыдущий слайд" disabled>
               <svg width="7" height="12" aria-hidden="true">
                 <use xlink:href="#icon-arrow"></use>
               </svg>
             </button>
             <button class="slider-controls slider-controls&#45;&#45;next" type="button" aria-label="Следующий слайд">
               <svg width="7" height="12" aria-hidden="true">
                 <use xlink:href="#icon-arrow"></use>
               </svg>
             </button>
           </div>
         </div>
       </section>
     </div>*/
     }
            <div className="page-content__section">
            <Reviews />
            </div>
          </div>
        )}
      </main>
      <UpBtn />
      <Footer />
    </div>
  );
}

export { Product };
