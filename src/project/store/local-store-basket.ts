
import { ReqRoutes } from '../const/const';
import { TCamera, TLocalStore, TPromo } from '../types/types';
import { api } from '../api/api';

const PROMO_BASKET = 'promo-basket';
let localPromo: TPromo[] = JSON.parse(localStorage.getItem(PROMO_BASKET)) || [];

const getPromo = () => {
  api
    .get<TPromo[]>(ReqRoutes.Promo)
    .then((response) => {
      localPromo = response.data;
      localStorage.setItem(PROMO_BASKET, JSON.stringify(localPromo));
    });

  return localPromo;
};
const promo = getPromo();

const CAMERA_BASKET = 'camera-basket';
const localStoreBasket: TLocalStore[] = JSON.parse(localStorage.getItem(CAMERA_BASKET)) || [];

const addCamera = (camera: TLocalStore, quantity: number) => {
  const isPromo = promo.find((cameraPromo) => cameraPromo.id === camera.id) ? true : false;

  const newCamera: TLocalStore = {
    ...camera,
    quantity: 1,
    isPromo: isPromo
  };

  localStoreBasket.push(newCamera);
  localStorage.setItem(CAMERA_BASKET, JSON.stringify(localStoreBasket));
};

const dropCamera = (cameraId: TCamera['id']) => {

  const removeCamera = localStoreBasket.find((camera) => camera.id === cameraId);
  localStorage.removeItem(CAMERA_BASKET);
};

const clearBasket = () => {
  localStorage.clear();
};

export { localStoreBasket, addCamera, dropCamera, clearBasket};

