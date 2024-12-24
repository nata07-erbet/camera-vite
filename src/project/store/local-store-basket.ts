import { TCamera } from '../types/types';

const CAMERA_BASKET = 'camera-basket';
const localStoreBasket: TCamera[] = JSON.parse(localStorage.getItem(CAMERA_BASKET)) || [];


const addCamera = (camera: TCamera) => {
  localStoreBasket.push(camera);

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

