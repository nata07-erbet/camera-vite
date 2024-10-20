import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import { ReqRoutes, TABS, TabsMap, DEFAULT_TAB } from '../const/const';
import { TCamera, TTab, TReview } from '../types/types';
import { Logo } from '../components/logo/logo';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { Rate } from '../components/rate/rate';
import { SimilarProduct } from '../components/similar-product/similar-product';
import { UpBtn } from '../components/up-btn/up-btn';
import { Reviews } from '../components/reviews-list/reviews-list';
import { Footer } from '../components/footer/footer';


function Product() {
  const [ cameras, setCameras ] = useState<TCamera[]>([]);
  const [ currentTab, setCurrentTab ] = useState<TTab>(DEFAULT_TAB);
  const [ reviews, setReviews ] = useState<TReview[]>([]);
  const [ similars, setSimilars ] = useState<TCamera[]>([]);

  const isActive = currentTab === DEFAULT_TAB;

  const classIsActiveTab = classNames('tabs__element', {
    'is-active': isActive,
    disabled: !isActive
  });

  const classNonActiveTab = classNames('tabs__element', {
    'is-active': !isActive,
    disabled: !isActive
  });


  const params = useParams();
  const cameraId = Number(params.id);
  const currentCamera = cameras.find((camera) => camera.id === cameraId);

  const handleTabClick = (tab: TTab) => {
    setCurrentTab(tab);
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    api
      .get<TCamera[]>(ReqRoutes.Cameras)
      .then((response) => setCameras(response.data));

    api
      .get<TReview[]>(`${ReqRoutes.Cameras}/${cameraId}/${ReqRoutes.Reviews}`)
      .then((response) => setReviews(response.data));

    api
      .get(`${ReqRoutes.Cameras}/${cameraId}/${ReqRoutes.Similar}`)
      .then((response) => setSimilars(response.data));

  }, [cameraId]);

  return (
    <div className='wrapper'>
      <header className='header' id='header'>
        <div className='container'>
          <Logo />
          <nav className='main-nav header__main-nav'>
            <ul className='main-nav__list'>
              <li className='main-nav__item'>
                <a className='main-nav__link' href='catalog.html'>
                  Каталог
                </a>
              </li>
              <li className='main-nav__item'>
                <a className='main-nav__link' href='#'>
                  Гарантии
                </a>
              </li>
              <li className='main-nav__item'>
                <a className='main-nav__link' href='#'>
                  Доставка
                </a>
              </li>
              <li className='main-nav__item'>
                <a className='main-nav__link' href='#'>
                  О компании
                </a>
              </li>
            </ul>
          </nav>
          {/*<div class='form-search'>
      <form>
        <label>
          <svg class='form-search__icon' width='16' height='16' aria-hidden='true'>
            <use xlink:href='#icon-lens'></use>
          </svg>
          <input class='form-search__input' type='text' autocomplete='off' placeholder='Поиск по сайту'>
        </label>
        <ul class='form-search__select-list'>
          <li class='form-search__select-item' tabindex='0'>Cannonball Pro MX 8i</li>
          <li class='form-search__select-item' tabindex='0'>Cannonball Pro MX 7i</li>
          <li class='form-search__select-item' tabindex='0'>Cannonball Pro MX 6i</li>
          <li class='form-search__select-item' tabindex='0'>Cannonball Pro MX 5i</li>
          <li class='form-search__select-item' tabindex='0'>Cannonball Pro MX 4i</li>
        </ul>
      </form>
      <button class='form-search__reset' type='reset'>
        <svg width='10' height='10' aria-hidden='true'>
          <use xlink:href='#icon-close'></use>
        </svg><span class='visually-hidden'>Сбросить поиск</span>
      </button>
    </div><a class='header__basket-link' href='#'>
      <svg width='16' height='16' aria-hidden='true'>
        <use xlink:href='#icon-basket'></use>
      </svg><span class='header__basket-count'>3</span></a>*/}
        </div>
      </header>
      <main>
        {currentCamera && (
          <div className='page-content'>
            <Breadcrumbs
              camera={currentCamera}
            />
            <div className='page-content__section'>
              <section className='product'>
                <div className='container'>
                  <div className='product__img'>
                    <picture>
                      <source
                        type='image/webp'
                        srcSet={`/${currentCamera.previewImgWebp}`}
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
                  <div className='product__content'>
                    <h1 className='title title--h3'>{currentCamera.name}</h1>
                    <Rate camera={currentCamera} />
                    <p className='product__price'>
                      <span className='visually-hidden'>Цена:</span>{(currentCamera.price).toLocaleString()} ₽
                    </p>
                    <button className='btn btn--purple' type='button'>
                      <svg width={24} height={16} aria-hidden='true'>
                        <use xlinkHref='#icon-add-basket' />
                      </svg>
                      Добавить в корзину
                    </button>

                    <div className='tabs product__tabs'>
                      <div className='tabs__controls product__tabs-controls'>
                        {TABS.map((tab) => (
                          <button
                            key={tab}
                            className='tabs__control'
                            type='button'
                            onClick={() => handleTabClick(tab)}
                          >
                            {TabsMap[tab]}
                          </button>
                        )
                        )}
                      </div>
                      <div className='tabs__content'>
                        <div className={classNonActiveTab}>
                          <ul className='product__tabs-list'>
                            <li className='item-list'>
                              <span className='item-list__title'>Артикул:</span>
                              <p className='item-list__text'> {currentCamera.id}</p>
                            </li>
                            <li className='item-list'>
                              <span className='item-list__title'>Категория:</span>
                              <p className='item-list__text'>{currentCamera.category}</p>
                            </li>
                            <li className='item-list'>
                              <span className='item-list__title'>Тип камеры:</span>
                              <p className='item-list__text'>{currentCamera.type}</p>
                            </li>
                            <li className='item-list'>
                              <span className='item-list__title'>Уровень:</span>
                              <p className='item-list__text'>{currentCamera.level}</p>
                            </li>
                          </ul>
                        </div>

                        <div className={classIsActiveTab}>
                          <div className='product__tabs-text'>
                            <p>
                              {currentCamera.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {similars &&
              <SimilarProduct similars={similars} />}
            {reviews && (
              <div className='page-content__section'>
                <Reviews reviews={reviews} />
              </div>
            )}
          </div>
        )}
      </main>
      <UpBtn onScrollTop = { handleScrollTop }/>
      <Footer />
    </div>
  );
}

export { Product };
