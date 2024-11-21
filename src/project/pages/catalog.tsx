import { useState, useEffect, useMemo } from 'react';
import { api } from '../api/api';
import { TCamera, TPromo, TSortType, TSortDirection, TFiltersData, TTypeValue, TTypeLevel } from '../types/types';
import { ReqRoutes, DEFAULT_SORT_TYPE, DEFAULT_SORT_DIRECTION, CategoryMap, CamerasMap, LevelMap, INITIAL_FILTERS } from '../const/const';
import { Header } from '../components/header/header';
import { SwiperSliders } from '../components/swiper-sliders/swiper-sliders';
import { ProductsList } from '../components/products-list/products-list';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { Sort } from '../components/sort/sort';
import { Filter } from '../components/filter/filter';
import { Pagination } from '../components/pagination/pagination';
import { PopUpContact } from '../components/pop-up/pop-up-contact';
import { Footer } from '../components/footer/footer';
import { compare, comparePrice } from '../utils/utils';


function Catalog() {
  const [cameras, setCameras] = useState<TCamera[]>([]);
  const [promos, setPromos] = useState<TPromo[]>([]);

  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [cameraId, setCameraId] = useState<TCamera['id']>();
  const cameraByBasket = cameras.find((camera) => camera.id === cameraId);

  const [ sortType, setSortType ] = useState<TSortType>(DEFAULT_SORT_TYPE);
  const [ sortDirection, setSortDirection ] = useState<TSortDirection>(DEFAULT_SORT_DIRECTION);

  const [ filters, setFilters ] = useState<TFiltersData>();

  const sortKey = `${sortType}-${sortDirection}`;
  const sortedCameras = compare(sortKey, cameras);
  const sortedByPriceCameras = cameras.toSorted(comparePrice);

  const prices = sortedByPriceCameras.map(camera => camera.price);
  const priceMin = Math.min(...prices);
  const priceMax = Math.max(...prices);

  function getKeyByValueType (value: TTypeValue) {
    return Object.keys(CamerasMap).find((key) => CamerasMap[key] === value);
  }

  function getKeyByValueLevel (value: TTypeLevel) {
    return Object.keys(LevelMap).find((key) => LevelMap[key] === value);
  }


  const filterCameras = (products: TCamera[], currentFilters: TFiltersData) => {
    products.filter((product) =>
      (!currentFilters?.category || product.category === CategoryMap[currentFilters?.category]) &&
      (currentFilters.types.includes(getKeyByValueType(product.type)) &&
      (currentFilters.levels.includes(getKeyByValueLevel(product.level)))
      ));
  };

  const filteredCameras = useMemo(() => {
    const result = filters
      ? filterCameras(cameras, filters)
      : cameras;

    return result;
  }, [cameras, filters]);

  const handleChangeFilters = (newData: TFiltersData) => {
    setFilters(newData);
  };

  const handleSubmit = () => {
    setIsShowPopUp(false);
  };

  const handleClosePopUp = () => {
    setIsShowPopUp(false);
  };

  const handleOpenPopUp = (id:TCamera['id']) => {
    setIsShowPopUp(true);
    setCameraId(id);
  };

  const handleClickType = (type: TSortType) => {
    setSortType(type);
  };

  const handleClickDirection = (direction : TSortDirection) => {
    setSortDirection(direction);
  };

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
    <div className="wrapper">
      <Header cameras={cameras}/>
      <main>
        { promos && <SwiperSliders promos={promos} />};
        <div className="page-content">
          <Breadcrumbs/>
          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img src="img/banner.png" />
                  <Filter
                    initialFilters = {filters}
                    onFeaturesChange = {(newData: TFiltersData) => handleChangeFilters(newData)}
                    onReset={handleResetFilters}
                    minPrice={priceMin}
                    maxPrice={priceMax}
                  />
                </div>
                <div className="catalog__content">
                  <Sort
                    onClickType = {handleClickType}
                    onClickDirection ={handleClickDirection}
                  />
                  {sortedCameras &&
                    <ProductsList
                      cameras={sortedCameras}
                      onOpen={(id) =>handleOpenPopUp(id)}
                    />}
                  <Pagination cameras={cameras}/>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      {cameraByBasket &&
        <PopUpContact
          onSubmit={handleSubmit}
          isActive={isShowPopUp}
          cameraByBasket={cameraByBasket}
          onClose={handleClosePopUp}
        />}
      <Footer />
    </div>
  );
}

export { Catalog };

