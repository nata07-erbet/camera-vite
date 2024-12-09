import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../api/api';
import { AppRoutes, ReqRoutes, TABS, TabsMap, DEFAULT_TAB } from '../const/const';
import { TCamera, TTab, TReview } from '../types/types';
import { Header } from '../components/header/header';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { Rate } from '../components/rate/rate';
import { SimilarProduct } from '../components/similar-product/similar-product';
import { UpBtn } from '../components/up-btn/up-btn';
import { Reviews } from '../components/reviews-list/reviews-list';
import { PopUpAddToBasket } from '../components/pop-up/pop-up-add-to-basket';
import { PopUpAddSuccess } from '../components/pop-up/pop-up-add-success';
import { Footer } from '../components/footer/footer';

import { cameraMocks } from '../mocks/camera-mocks';
const camerasByBasket: TCamera[] = cameraMocks;

function Product() {
  const [cameras, setCameras] = useState<TCamera[]>([]);
  const [currentTab, setCurrentTab] = useState<TTab>(DEFAULT_TAB);
  const [reviews, setReviews] = useState<TReview[]>([]);
  const [similars, setSimilars] = useState<TCamera[]>([]);
  const [ isShowPopUp, setIsShowPopUp ] = useState(false);
  const [ isShowPopUpSuccess, setIsShowPopUpSuccess ] = useState(false);

  const isActive = currentTab === DEFAULT_TAB;

  const classIsActiveTab = classNames('tabs__element', {
    'is-active': isActive,
    disabled: !isActive,
  });

  const classNonActiveTab = classNames('tabs__element', {
    'is-active': !isActive,
    disabled: !isActive,
  });

  const params = useParams();
  const cameraId = Number(params.id);
  const currentCamera = cameras.find((camera) => camera.id === cameraId);
  const navigate = useNavigate();

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

  const handleButtonClick = () => {
    setIsShowPopUp(true);
  };

  const handlePopUpClose = () => {
    setIsShowPopUp(false);
    setIsShowPopUpSuccess(false);
  };

  const handleClickAddSuccess = () => {
    setIsShowPopUpSuccess(true);
  };

  const handleContinue = () => {
    navigate(AppRoutes.Main);
    setIsShowPopUp(false);
    setIsShowPopUpSuccess(false);
  };

  useEffect(() => {
    api
      .get<TCamera[]>(ReqRoutes.Cameras)
      .then((response) => setCameras(response.data));

    api
      .get<TReview[]>(`${ReqRoutes.Cameras}/${cameraId}/${ReqRoutes.Reviews}`)
      .then((response) => setReviews(response.data));

    api
      .get<TCamera[]>(`${ReqRoutes.Cameras}/${cameraId}/${ReqRoutes.Similar}`)
      .then((response) => setSimilars(response.data));
  }, [cameraId]);

  return (
    <div className="wrapper" data-testid="product-page">
      <Header cameras={cameras} camerasByBasket={camerasByBasket} />
      <main>
        {currentCamera && (
          <div className="page-content">
            <Breadcrumbs camera={currentCamera} isBasketPage={false} />
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source
                        type="image/webp"
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
                  <div className="product__content">
                    <h1 className="title title--h3">{currentCamera.name}</h1>
                    <Rate camera={currentCamera} />
                    <p className="product__price">
                      <span className="visually-hidden">Цена:</span>
                      {currentCamera.price.toLocaleString()} ₽
                    </p>
                    <button
                      className="btn btn--purple"
                      type="button"
                      onClick={handleButtonClick}
                    >
                      <svg width={24} height={16} aria-hidden="true">
                        <use xlinkHref="#icon-add-basket" />
                      </svg>
                      Добавить в корзину
                    </button>

                    <div className="tabs product__tabs">
                      <div className="tabs__controls product__tabs-controls">
                        {TABS.map((tab) => (
                          <button
                            key={tab}
                            className="tabs__control"
                            type="button"
                            onClick={() => handleTabClick(tab)}
                          >
                            {TabsMap[tab]}
                          </button>
                        ))}
                      </div>
                      <div className="tabs__content">
                        <div className={classNonActiveTab}>
                          <ul className="product__tabs-list">
                            <li className="item-list">
                              <span className="item-list__title">Артикул:</span>
                              <p className="item-list__text">
                                {' '}
                                {currentCamera.id}
                              </p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">
                                Категория:
                              </span>
                              <p className="item-list__text">
                                {currentCamera.category}
                              </p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">
                                Тип камеры:
                              </span>
                              <p className="item-list__text">
                                {currentCamera.type}
                              </p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">Уровень:</span>
                              <p className="item-list__text">
                                {currentCamera.level}
                              </p>
                            </li>
                          </ul>
                        </div>

                        <div className={classIsActiveTab}>
                          <div className="product__tabs-text">
                            <p>{currentCamera.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {similars && <SimilarProduct similars={similars} />}
            {reviews && (
              <div className="page-content__section">
                <Reviews reviews={reviews} />
              </div>
            )}
          </div>
        )}
      </main>
      {currentCamera && (
        <PopUpAddToBasket
          camera={currentCamera}
          isActive={isShowPopUp}
          onClose={handlePopUpClose}
          onClickAddSuccess={handleClickAddSuccess}
        />
      )}
      <PopUpAddSuccess
        isActive={isShowPopUpSuccess}
        onClose={handlePopUpClose}
        onContinue={handleContinue}
      />
      <UpBtn onScrollTop={handleScrollTop} />
      <Footer />
    </div>
  );
}

export { Product };
