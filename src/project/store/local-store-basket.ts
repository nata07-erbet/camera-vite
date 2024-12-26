import { useEffect } from 'react';
import { ReqRoutes } from '../const/const';
import { TCamera, TLocalStore, TPromo } from '../types/types';
import { api } from '../api/api';


const getPromo = () => {
  let promo: TPromo[] = [];

    api
    .get<TPromo[]>(ReqRoutes.Promo)
    .then((response) => console.log(response.data));

    return promo;
}

console.log(getPromo());

const CAMERA_BASKET = 'camera-basket';
const localStoreBasket: TLocalStore[] =  JSON.parse(localStorage.getItem(CAMERA_BASKET)) || [];

const addCamera = (camera: TLocalStore, quantity: number) => {
  const newCamera: TLocalStore = {
    ...camera,
    quantity: 10
  };

  localStoreBasket.push(newCamera);
  localStorage.setItem(CAMERA_BASKET, JSON.stringify(localStoreBasket));
};

const dropCamera = (cameraId: TCamera['id']) => {

  const removeCamera = localStoreBasket.find((camera) => camera.id === cameraId);
  localStorage.removeItem(CAMERA_BASKET)
};

const clearBasket = () => {
  localStorage.clear();
}

export { localStoreBasket, addCamera, dropCamera, clearBasket}

