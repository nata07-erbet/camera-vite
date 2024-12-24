import { TLocalStore } from '../types/types';

const CAMERA_BASKET = 'camera-basket';
const localStoreBasket: TLocalStore[] = JSON.parse(localStorage.getItem(CAMERA_BASKET)) || [];

const addCamera = (camera: TLocalStore, quantity) => {
  const newCamera: TLocalStore = {
    ...camera,
    quantity: 2
  }
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

