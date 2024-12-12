import { api } from '../api/api';
import { useEffect, useState} from 'react';
import { ReqRoutes } from '../const/const';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { TCamera } from '../types/types';
import { BasketList } from '../components/basket-list/basket-list';
import { PopUpRemove } from '../components/pop-up/pop-up-remove';

import { cameraMocks } from '../mocks/camera-mocks';
const camerasByBasket: TCamera[] = cameraMocks;

function Basket() {
  const [ cameras, setCameras ] = useState<TCamera[]>([]);
  const [ popUpIsShow, setPopUpIsShow ] = useState(false);
  const [ isRemoveItem, setIsRemoveItem ] = useState(false);

  useEffect(() => {
    api
      .get<TCamera[]>(ReqRoutes.Cameras)
      .then((response) => setCameras(response.data));
  }, []);

  const handleDeleteFromBasket = () => {
    setPopUpIsShow(true);
  };

  const handleClosePopUp = () => {
    setPopUpIsShow(false);
  };

  const handleClickRemoveFromBasket = () => {
    setIsRemoveItem(true);
  };

  return(
    <div className="wrapper">
      <Header cameras={cameras} camerasByBasket={camerasByBasket}/>
      <main>
        <div className="page-content">
          <Breadcrumbs isBasketPage />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <BasketList
                cameras={camerasByBasket}
                onDelete={handleDeleteFromBasket}
                isRemoveItem={isRemoveItem}

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
                  <button className="btn btn--purple" type="submit">
                    Оформить заказ
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <PopUpRemove
        isActive={popUpIsShow}
        camera={cameraMocks[0]}
        onClose={handleClosePopUp}
        onRemoveFromBasket={handleClickRemoveFromBasket}
      />
      <Footer/>
    </div>
  );
}
export { Basket };
