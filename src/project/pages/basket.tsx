import { api } from '../api/api';
import { useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes, ReqRoutes, RequestStatus } from '../const/const';
import { TOrder } from '../types/types';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { TCamera } from '../types/types';
import { BasketList } from '../components/basket-list/basket-list';
import { Spinner } from '../components/spinner/spinner';
import { PopUpRemove } from '../components/pop-up/pop-up-remove';
import { PopUpAddThanks } from '../components/pop-up/pop-up-add-thanks';
import { PopUpError } from '../components/pop-up/pop-up-error';

import { cameraMocks } from '../mocks/camera-mocks';
const camerasByBasket: TCamera[] = cameraMocks.slice(0,3);

function Basket() {
  const navigate = useNavigate();

  const [sendingStatus, setSendingStatus ] = useState(RequestStatus.Idle);
  const [ isSending, setIsSending ] = useState(false);
  const [ cameras, setCameras ] = useState<TCamera[]>([]);

  const [ popUpIsShow, setPopUpIsShow ] = useState(false);
  const [ isShowPopUpThanks, setIsShowPopUpThanks ] = useState(false);
  const [ isShowPopUpError, setIsShowPopUpError ] = useState(false);

  const [ camerasByBasketLocal, setCamerasByBasketLocal ] = useState(camerasByBasket);


  const [ selectedIdDelete, setSelectedIdDelete ] = useState<TCamera['id'] | null>(null);
  const [ selectedIdRemove, setSelectedIdRemove ] = useState<TCamera['id'] | null>(null);

  const cameraByDelete = cameras.find((camera) => camera.id === selectedIdDelete);

  useEffect(() => {
    api
      .get<TCamera[]>(ReqRoutes.Cameras)
      .then((response) => setCameras(response.data));
  }, []);


  const handleDeleteFromBasket = (id: TCamera['id']) => {
    setPopUpIsShow(true);
    setSelectedIdDelete(id);
  };

  const handleClickRemoveFromBasket = (id: TCamera['id']) => {
    setSelectedIdRemove(id);
    setPopUpIsShow(false);
  };

  const handleClosePopUp = () => {
    setPopUpIsShow(false);
    setIsShowPopUpThanks(false);
    setIsShowPopUpError(false)
    navigate(AppRoutes.Main);

  };

  const onClear = () => {
    setCamerasByBasketLocal([]);
  };

  const handleClickSubmit = () => {
    setSendingStatus(RequestStatus.Pending); //?
    setIsSending(true);

    const orderData: TOrder = {
      camerasIds: camerasByBasket.map((camera) => camera.id),
      coupon: 'camera-333'
    };

    api
      .post(ReqRoutes.Orders, orderData)
      .then((response) => {
        setIsShowPopUpThanks(true);
        onClear();
        setSendingStatus(RequestStatus.Success)
      })
      .catch((error) => {
        console.log(error);
        setSendingStatus(RequestStatus.Error)
        setIsShowPopUpError(true);

      })
  };

  return(
    <>
      {sendingStatus === RequestStatus.Pending && (<Spinner />)}
      <div className="wrapper">
          <Header cameras={cameras} camerasByBasket={camerasByBasket}/>
          <main>
            <div className="page-content">
              <Breadcrumbs isBasketPage />
              <section className="basket">
                <div className="container">
                  <h1 className="title title--h2">Корзина</h1>
                  <BasketList
                    cameras={camerasByBasketLocal}
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

                    <div className="basket__summary-order">
                      <p className="basket__summary-item">
                        <span className="basket__summary-text">Всего:</span>
                        <span className="basket__summary-value">111 390 ₽</span>
                      </p>
                      <p className="basket__summary-item">
                        <span className="basket__summary-text">Скидка:</span>
                        <span className="basket__summary-value basket__summary-value--bonus">
                          0 ₽
                        </span>
                      </p>
                      <p className="basket__summary-item">
                        <span className="basket__summary-text basket__summary-text--total">
                          К оплате:
                        </span>
                        <span className="basket__summary-value basket__summary-value--total">
                          111 390 ₽
                        </span>
                      </p>
                      <button
                        className="btn btn--purple"
                        type="submit"
                        disabled={camerasByBasket.length === 0}
                        onClick={handleClickSubmit}
                      >
                        Оформить заказ
                      </button>
                    </div>

                  </div>
                </div>
              </section>
            </div>
          </main>
          {cameraByDelete && (
            <PopUpRemove
              isActive={popUpIsShow}
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
