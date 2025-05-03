import { useState, useMemo, useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';

import {
  TCamera,
  TSortType,
  TSortDirection,
  TFiltersData,
  TFilterPriceRange,
} from '../types/types';
import {
  DEFAULT_SORT_TYPE,
  DEFAULT_SORT_DIRECTION,
  INITIAL_FILTERS,
  CATALOG_SHOW,
} from '../const/const';

// import { localStoreBasket } from '../store/local-store-basket';
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
import { Spinner } from '../components/spinner/spinner';
import { PopUpLogin } from '../components/pop-up/pop-up-login';
import {
  compare,
  filterCameras,
  filterCamerasByPrice,
  getMinMaxPrices,
  getCamerasByPagination,
} from '../utils/utils';
import { fetchCameras } from '../store/api-actions';
import { getCamerasWithNewProps } from '../store/action';

function Catalog() {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector((state) => state.cameras);
  const camera = useAppSelector((state) => state.camera);
  const page = useAppSelector((state) => state.currentPage);

  useEffect(() => {
    dispatch(fetchCameras());
    dispatch(getCamerasWithNewProps());
  }, []);

  const [cameraId, setCameraId] = useState<TCamera['id'] | null>(null);
  const [idSuccess, setIdSuccess] = useState<TCamera['id']>();

  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [isShowPopUpSuccess, setIsShowPopUpSuccess] = useState(false);

  const [sortType, setSortType] = useState<TSortType>(DEFAULT_SORT_TYPE);
  const [sortDirection, setSortDirection] = useState<TSortDirection>(
    DEFAULT_SORT_DIRECTION,
  );

  const [filters, setFilters] = useState<TFiltersData>(INITIAL_FILTERS);

  const [priceRange, setPriceRange] = useState<Partial<TFilterPriceRange>>([]);

  const [currentPage, setCurrentPage] = useState<number>(5);

  const sortKey = `${sortType}-${sortDirection}` as const;
  const sortedCameras = compare(sortKey, cameras);

  const filteredCameras = useMemo(
    () => filterCameras(sortedCameras, filters),
    [sortedCameras, filters],
  );

  const [minPrice, maxPrice] = useMemo(
    () => getMinMaxPrices(filteredCameras),
    [filteredCameras],
  );

  const camerasToShow = filterCamerasByPrice(filteredCameras, priceRange);
  const camerasByPagination = getCamerasByPagination(camerasToShow, page);

  console.log(camerasByPagination);

  const amountCatalogPages = camerasToShow
    ? Math.ceil(camerasToShow.length / CATALOG_SHOW)
    : 0;

  const handleChangeFilters = (newData: TFiltersData) => {
    setFilters(newData);
  };

  const handleClickAddSuccess = (id: TCamera['id']) => {
    setIsShowPopUpSuccess(true);
    setCameraId(id);
    setIdSuccess(id);
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

  const handlePageChange = () => {
    setCurrentPage(5);
  };

  const isLoadingCameras = useAppSelector(
    (state) => state.isCamerasDataLoading,
  );

  const isLoading = false;
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="wrapper" data-testid="main-page">
          <Header />
          <main>
            <SwiperSliders />;
            <div className="page-content">
              <Breadcrumbs cameraId={cameraId} isBasketPage={false} />
              <section className="catalog">
                <div className="container">
                  <h1 className="title title--h2">
                    Каталог фото- и видеотехники
                  </h1>
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
                          cameras={camerasByPagination}
                          onOpen={(id) => handleOpenPopUp(id)}
                          idSuccess={idSuccess}
                        />
                      )}
                      <Pagination />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
          {camera && (
            <PopUpAddToBasket
              camera={camera}
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
          <PopUpLogin isActive={true} />
          <Footer />
        </div>
      )}
    </>
  );
}

export { Catalog };
