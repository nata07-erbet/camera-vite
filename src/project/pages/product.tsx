import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { fetchCameras, fetchSimilars } from '../store/api-actions';
import { fetchCamera } from '../store/action';
import { fetchReviews } from '../store/api-actions';
import { useParams, useNavigate } from 'react-router-dom';
import { AppRoutes, TABS, TabsMap, DEFAULT_TAB } from '../const/const';
import { TCamera, TTab } from '../types/types';
import { Header } from '../components/header/header';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { Rate } from '../components/rate/rate';
import { SimilarProduct } from '../components/similar-product/similar-product';
import { UpBtn } from '../components/up-btn/up-btn';
import { ReviewsList } from '../components/reviews-list/reviews-list';
import { PopUpAddToBasket } from '../components/pop-up/pop-up-add-to-basket';
import { PopUpAddSuccess } from '../components/pop-up/pop-up-add-success';
import { PopUpAddReview } from '../components/pop-up/pop-up-add-review';
import { PopUpReviewThanks } from '../components/pop-up/pop-up-review-thanks';
import { Footer } from '../components/footer/footer';

function Product() {
  const params = useParams();
  const cameraId = Number(params.id);

  const dispatch = useAppDispatch();

  const similars = useAppSelector((state) => state.similars);
  const reviews = useAppSelector((state) => state.reviews);
  const currentCameraByProduct = useAppSelector((state) => state.camera);

  useEffect(() => {
    if (cameraId) {
      dispatch(fetchCamera(cameraId));
      dispatch(fetchSimilars(cameraId));
      dispatch(fetchReviews(cameraId));
    }
    dispatch(fetchCameras());
  }, [dispatch, cameraId]);

  const navigate = useNavigate();
  const [currentTab, setCurrentTab] = useState<TTab>(DEFAULT_TAB);

  const [cameraIdSimilar, setCameraIdSimilar] = useState<TCamera['id'] | null>(
    null,
  );
  const [currentCamera, setCurrentCamera] = useState<TCamera | null>(null);

  const [isShowPopUpAddBasket, setIsShowPopUpAddBasket] = useState(false);
  const [isShowPopUpSuccess, setIsShowPopUpSuccess] = useState(false);
  const [isShowPopUpReview, setIsShowPopUpReview] = useState(false);
  const [isShowPopUpReviewThanks, setIsShowPopUpReviewThanks] = useState(false);

  const isActive = currentTab === DEFAULT_TAB;

  const classIsActiveTab = classNames('tabs__element', {
    'is-active': isActive,
    disabled: !isActive,
  });

  const classNonActiveTab = classNames('tabs__element', {
    'is-active': !isActive,
    disabled: !isActive,
  });

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

  const handleButtonClickAddBasketByProduct = () => {
    setIsShowPopUpAddBasket(true);
    currentCameraByProduct && setCurrentCamera(currentCameraByProduct);
  };

  const handlePopUpClose = () => {
    setIsShowPopUpAddBasket(false);
    setIsShowPopUpSuccess(false);
    setIsShowPopUpReview(false);
    setIsShowPopUpReviewThanks(false);
  };

  const handleClickAddSuccess = (id: TCamera['id']) => {
    setIsShowPopUpSuccess(true);
    setCameraIdSimilar(id);
  };

  const handleContinue = () => {
    navigate(AppRoutes.Main);
    setIsShowPopUpAddBasket(false);
    setIsShowPopUpSuccess(false);
  };

  const handleClickAddReview = () => {
    setIsShowPopUpReview(true);
  };

  const handleFormSubmitReview = () => {
    setIsShowPopUpReview(false);
    setIsShowPopUpReviewThanks(true);
  };

  const handleOpenPopUpAddBasketBySimilar = (id: TCamera['id']) => {
    setIsShowPopUpAddBasket(true);
    setCameraIdSimilar(id);
    const currentCameraBySimilar = similars.find(
      (similar) => similar.id === cameraIdSimilar,
    );

    if (currentCameraBySimilar) {
      return setCurrentCamera(currentCameraBySimilar);
    }
  };

  return (
    <div className="wrapper" data-testid="product-page">
      <Header />
      <main>
        {currentCameraByProduct && (
          <div className="page-content">
            <Breadcrumbs
              cameraId={currentCameraByProduct.id}
              isBasketPage={false}
            />
            <div className="page-content__section">
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={`/${currentCameraByProduct.previewImgWebp}`}
                      />
                      <img
                        src={`/${currentCameraByProduct.previewImg}`}
                        srcSet={`/${currentCameraByProduct.previewImg2x}`}
                        width={560}
                        height={480}
                        alt={currentCameraByProduct.name}
                      />
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">
                      {currentCameraByProduct.name}
                    </h1>
                    <Rate camera={currentCameraByProduct} />
                    <p className="product__price">
                      <span className="visually-hidden">Цена:</span>
                      {currentCameraByProduct.price.toLocaleString()} ₽
                    </p>
                    <button
                      className="btn btn--purple"
                      type="button"
                      onClick={handleButtonClickAddBasketByProduct}
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
                            className={classNames('tabs__control', {
                              'is-active': tab === currentTab,
                            })}
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
                                {currentCameraByProduct.id}
                              </p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">
                                Категория:
                              </span>
                              <p className="item-list__text">
                                {currentCameraByProduct.category}
                              </p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">
                                Тип камеры:
                              </span>
                              <p className="item-list__text">
                                {currentCameraByProduct.type}
                              </p>
                            </li>
                            <li className="item-list">
                              <span className="item-list__title">Уровень:</span>
                              <p className="item-list__text">
                                {currentCameraByProduct.level}
                              </p>
                            </li>
                          </ul>
                        </div>

                        <div className={classIsActiveTab}>
                          <div className="product__tabs-text">
                            <p>{currentCameraByProduct.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
            {similars && (
              <SimilarProduct
                similars={similars}
                onOpen={(id) => handleOpenPopUpAddBasketBySimilar(id)}
              />
            )}
            <div className="page-content__section">
              {reviews.length > 0 && (
                <ReviewsList
                  reviews={reviews}
                  onClickAddReview={handleClickAddReview}
                />
              )}
            </div>
          </div>
        )}
      </main>
      {currentCamera && (
        <PopUpAddToBasket
          camera={currentCamera}
          isActive={isShowPopUpAddBasket}
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
      <PopUpAddReview
        isActive={isShowPopUpReview}
        onClose={handlePopUpClose}
        cameraId={cameraId}
        onSubmit={handleFormSubmitReview}
      />
      <PopUpReviewThanks
        isActive={isShowPopUpReviewThanks}
        onClose={handlePopUpClose}
        onClosePopUpReviewThanks={handlePopUpClose}
      />
      <Footer />
    </div>
  );
}

export { Product };
