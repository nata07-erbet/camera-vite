import { useState, useEffect, ChangeEvent } from 'react';
import { api } from '../api/api';
import { TCamera, TPromo } from '../types/types';
import { ReqRoutes } from '../const/const';
import { Header } from '../components/header/header';
import { SwiperSliders } from '../components/swiper-sliders/swiper-sliders';
import { ProductsList } from '../components/products-list/products-list';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { Sort } from '../components/sort/sort';
import { Filter } from '../components/filter/filter';
import { Pagination } from '../components/pagination/pagination';
import { PopUpContact } from '../components/pop-up/pop-up-contact';
import { Footer } from '../components/footer/footer';

function Catalog() {
  const [cameras, setCameras] = useState<TCamera[]>([]);
  const [promos, setPromos] = useState<TPromo[]>([]);

  const [isShowPopUp, setIsShowPopUp] = useState(false);
  const [cameraId, setCameraId] = useState<TCamera['id']>();

  const [ inputItems, setInputItems ] = useState('');

  const cameraByBasket = cameras.find((camera) => camera.id === cameraId);

  const sortedCameras = inputItems.length >= 3 ? cameras.filter(({ name }) => name.toLocaleLowerCase().includes(inputItems.toLocaleLowerCase())) : [];

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

  const handleChangeInput = (evt: ChangeEvent<HTMLInputElement>) => {
    setInputItems(evt.target.value);
  };

  const handleResetInput = () => {
    setInputItems('');
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
      {sortedCameras &&
        <Header
          inputItems={inputItems}
          cameras={sortedCameras}
          onChange={handleChangeInput}
          onReset={handleResetInput}
        />}
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
                  <Filter />
                </div>
                <div className="catalog__content">
                  <Sort />
                  {cameras &&
                    <ProductsList
                      cameras={cameras}
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

