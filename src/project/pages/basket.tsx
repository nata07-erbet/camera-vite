import { api } from '../api/api';
import { useEffect, useState} from 'react';
import { ReqRoutes } from '../const/const';
import { Header } from '../components/header/header';
import { Footer } from '../components/footer/footer';
import { Breadcrumbs } from '../components/breadcrumbs/breadcrumbs';
import { BasketItem } from '../components/basket-item/basket-item';
import { TCamera } from '../types/types';

function Basket() {
  const [cameras, setCameras] = useState<TCamera[]>([]);
  const addedCamera = cameras.find((camera) => camera.id === 2);

  useEffect(() => {
    api
      .get<TCamera[]>(ReqRoutes.Cameras)
      .then((response) => setCameras(response.data));
  }, []);

  return(
    <div className="wrapper">
      <Header cameras={cameras}/>
      <main>
        <div className="page-content">
          <Breadcrumbs isBasketPage />
          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              <ul className="basket__list">
                {addedCamera && <BasketItem camera={addedCamera}/>}
              </ul>
              <div className="basket__summary">
                <div className="basket__promo">
                  {/*<p class="title title&#45;&#45;h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                <div class="basket-form">
                  <form action="#">
                    <div class="custom-input">
                      <label><span class="custom-input__label">Промокод</span>
                        <input type="text" name="promo" placeholder="Введите промокод">
                      </label>
                      <p class="custom-input__error">Промокод неверный</p>
                      <p class="custom-input__success">Промокод принят!</p>
                    </div>
                    <button class="btn" type="submit">Применить
                    </button>
                  </form>
                </div>*/}
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
      <Footer/>
    </div>
  );
}
export { Basket };
