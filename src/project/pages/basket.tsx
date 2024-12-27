import { api } from '../api/api';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, ReqRoutes, RequestStatus } from '../const/const';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { TCamera } from '../types/types';
import { BasketList } from '../components/basket-list/basket-list';
import { Spinner } from '../components/spinner/spinner';
import { PopUpRemove } from '../components/pop-up/pop-up-remove';
import { PopUpAddThanks } from '../components/pop-up/pop-up-add-thanks';
import { PopUpError } from '../components/pop-up/pop-up-error';
import { localStoreBasket } from '../store/local-store-basket';
import { dropCamera, clearBasket } from '../store/local-store-basket';
import { Summary } from '../components/summary/summary';

function Basket() {
  const navigate = useNavigate();
  clearBasket();

  const [sendingStatus, setSendingStatus ] = useState();
  const isSending = sendingStatus === RequestStatus.Pending;

  const [ cameras, setCameras ] = useState<TCamera[]>([]);

  const [ isShowPopUpRemove, setIsShowPopUpRemove ] = useState(false);
  const [ isShowPopUpThanks, setIsShowPopUpThanks ] = useState(false);
  const [ isShowPopUpError, setIsShowPopUpError ] = useState(false);

  const [ selectedIdDelete, setSelectedIdDelete ] = useState<TCamera['id'] | null>(null);
  const [ selectedIdRemove, setSelectedIdRemove ] = useState<TCamera['id'] | null>(null);


  const cameraByDelete = cameras.find((camera) => camera.id === selectedIdDelete);

  useEffect(() => {
    api
      .get<TCamera[]>(ReqRoutes.Cameras)
      .then((response) => setCameras(response.data));
  }, []);


  const handleDeleteFromBasket = (id: TCamera['id']) => {
    setIsShowPopUpRemove(true);
    setSelectedIdDelete(id);
  };

  // кнопка удалить
  const handleClickRemoveFromBasket = (id: TCamera['id']) => {
    setSelectedIdRemove(id);
    dropCamera(id);
    setIsShowPopUpRemove(false);
  };

  const handleClosePopUp = () => {
    setIsShowPopUpRemove(false);
    setIsShowPopUpThanks(false);
    setIsShowPopUpError(false);
    navigate(AppRoutes.Main);
  };

  const handleSending = () => {
    setSendingStatus(RequestStatus.Pending);
  };

  const handleSummit = () => {
    setIsShowPopUpThanks(true);
    clearBasket();
  };

  const handleError = () => {
    setIsShowPopUpError(true);
  };

  return(
    <>
      {isSending && (<Spinner />)}
      <div className="wrapper">
        <Header cameras={cameras} camerasByBasket={localStoreBasket}/>
        <main>
          <div className="page-content">
            <Breadcrumbs isBasketPage />
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <BasketList
                  cameras={localStoreBasket}
                  onDeleteFromBasket={handleDeleteFromBasket}
                  selectedId={selectedIdRemove}
                  isSending={isSending}
                />
                <div className="basket__summary">
                  <div className="basket__promo">
                    <p className="title title--h4">
                      Если у вас есть промокод на скидку, примените его в этом поле
                    </p>
                    <div className="basket-form">
                      <form action="#">
                        <div className="custom-input">
                          <label>
                            <span className="custom-input__label">Промокод</span>
                            <input type="text" name="promo" placeholder="Введите промокод" />
                          </label>
                          <p className="custom-input__error">Промокод неверный</p>
                          <p className="custom-input__success">Промокод принят!</p>
                        </div>
                        <button className="btn" type="submit">
                          Применить
                        </button>
                      </form>
                    </div>
                  </div>
                  <Summary
                    onSending={handleSending}
                    onSubmit={handleSummit}
                    onError={handleError}
                  />
                </div>
              </div>
            </section>
          </div>
        </main>
        {cameraByDelete && (
          <PopUpRemove
            isActive={isShowPopUpRemove}
            camera={cameraByDelete}
            onClose={handleClosePopUp}
            onRemoveFromBasket={handleClickRemoveFromBasket}
          />)}
        <PopUpAddThanks
          isActive={isShowPopUpThanks}
          onClose={handleClosePopUp}
        />
        <PopUpError
          isActive={isShowPopUpError}
          onClose={handleClosePopUp}
        />
        <Footer/>
      </div>
    </>
  );
}
export { Basket };
