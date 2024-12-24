import { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../api/api';
import {
  TCamera,
  TPromo,
  TSortType,
  TSortDirection,
  TFiltersData,
  TFilterPriceRange,
} from '../types/types';
import {
  ReqRoutes,
  DEFAULT_SORT_TYPE,
  DEFAULT_SORT_DIRECTION,
  INITIAL_FILTERS,
} from '../const/const';
import { Header } from '../components/header/header';
import { SwiperSliders } from '../components/swiper-sliders/swiper-sliders';
import { ProductsList } from '../components/products-list/products-list';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { Sort } from '../components/sort/sort';
import { Filter } from '../components/filter/filter';
import { Pagination } from '../components/pagination/pagination';
import { PopUpAddToBasket } from '../components/pop-up/pop-up-add-to-basket';
import { PopUpAddSuccess } from '../components/pop-up/pop-up-add-success';
import { Footer } from '../components/footer/footer';
import {
  compare,
  filterCameras,
  filterCamerasByPrice,
  getMinMaxPrices,
} from '../utils/utils';
import { addCamera } from '../store/local-store-basket';

import { cameraMocks } from '../mocks/camera-mocks';
const camerasByBasketMock: TCamera[] = cameraMocks.slice(0,3);

function Catalog() {

  const [ cameras, setCameras ] = useState<TCamera[]>([]);
  const [ promos, setPromos ] = useState<TPromo[]>([]);
  const [cameraId, setCameraId] = useState<TCamera['id']| null>(null);
  const currentCamera = cameras.find((camera) => camera.id === cameraId);
  const [ idSuccess, setIdSuccess ] = useState<TCamera['id']>()


  const [ isShowPopUp, setIsShowPopUp] = useState(false);
  const [ isShowPopUpSuccess, setIsShowPopUpSuccess ] = useState(false);


  const [sortType, setSortType] = useState<TSortType>(DEFAULT_SORT_TYPE);
  const [sortDirection, setSortDirection] = useState<TSortDirection>(
    DEFAULT_SORT_DIRECTION
  );

  const [ filters, setFilters ] = useState<TFiltersData>(INITIAL_FILTERS);

  const [ priceRange, setPriceRange ] = useState<Partial<TFilterPriceRange>>([]);

  const sortKey = `${sortType}-${sortDirection}` as const;
  const sortedCameras = compare(sortKey, cameras);

  const filteredCameras = useMemo(
    () => filterCameras(sortedCameras, filters),
    [sortedCameras, filters]
  );

  const [minPrice, maxPrice] = useMemo(
    () => getMinMaxPrices(filteredCameras),
    [filteredCameras]
  );


  const camerasToShow = filterCamerasByPrice(filteredCameras, priceRange);

  const handleChangeFilters = (newData: TFiltersData) => {
    setFilters(newData);
  };

  const handleClickAddSuccess = (id:TCamera['id'], camera: TCamera) => {
    setIsShowPopUpSuccess(true);
    setCameraId(id);
    setIdSuccess(id);
    addCamera(camera);
  };

  const handlePopUpClose = () => {
    setIsShowPopUp(false);
    setIsShowPopUpSuccess(false);
  };

  const handleContinue = () => {
    setIsShowPopUp(false);
    setIsShowPopUpSuccess(false);
  };

  const handleOpenPopUp = (id: TCamera['id']) => {
    setIsShowPopUp(true);
    setCameraId(id);
  };

  const handleClickType = (type: TSortType) => {
    setSortType(type);
  };

  const handleClickDirection = (direction: TSortDirection) => {
    setSortDirection(direction);
  };

  const handlePricesChange = useCallback((range: TFilterPriceRange) => {
    setPriceRange(range);
  }, []);

  const handleResetFilters = () => {
    setFilters(INITIAL_FILTERS);
  };

  useEffect(() => {
    api
      .get<TCamera[]>(`${ReqRoutes.Cameras}`)
      .then((response) => setCameras(response.data));

    api
      .get<TCamera[]>(`${ReqRoutes.Promo}`)
      .then((response) => setPromos(response.data));
  }, []);

  return (
    <div className="wrapper" data-testid="main-page">
      <Header cameras={cameras} camerasByBasket={camerasByBasketMock} />
      <main>
        {promos && <SwiperSliders promos={promos} />};
        <div className="page-content">
          <Breadcrumbs isBasketPage={false} />
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img src="img/banner.png" />
                  <Filter
                    initialFilters={filters}
                    onFeaturesChange={handleChangeFilters}
                    onReset={handleResetFilters}
                    minPrice={minPrice}
                    maxPrice={maxPrice}
                    initPriceRange={priceRange}
                    onPricesChange={handlePricesChange}
                  />
                </div>
                <div className="catalog__content">
                  <Sort
                    onClickType={handleClickType}
                    onClickDirection={handleClickDirection}
                  />
                  {camerasToShow && (
                    <ProductsList
                      cameras={camerasToShow}
                      onOpen={(id) => handleOpenPopUp(id)}
                      idSuccess={idSuccess}
                    />
                  )}
                  <Pagination cameras={cameras} />
                </div>
              </div>
            </div>
          </section>
        </div>
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
      <Footer />
    </div>
  );
}

export { Catalog };
