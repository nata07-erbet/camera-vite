import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { DATE_FORMAT } from '../const/const';
import {TCamera, TReview } from '../types/types';

const compareDate = (a: TReview, b: TReview) => {
  const dateA = new Date(a.createAt);
  const dateB = new Date(b.createAt);

  return Number(dateB) - Number(dateA);
};
const formatDate = (date: string) => dayjs(date).locale('ru').format(DATE_FORMAT);


const comparePrice = (a: TCamera, b: TCamera) => a.price - b.price;
const compareRating = (a: TCamera, b: TCamera) => a.rating - b.rating;

const compare = (typeofSort: string, camera: TCamera[]) => {
  const camerasSorted:TCamera[] = camera;

  switch (typeofSort) {
    case 'price-up':
      return camera.toSorted(comparePrice);
      break;

    case 'price-down':
      return camera.toSorted(comparePrice).reverse();
      break;

    case 'popular-up':
      return camera.toSorted(compareRating);
      break;

    case 'popular-down':
      return camera.toSorted(compareRating).reverse();
      break;
  }
  return camerasSorted;
};


export { formatDate, compareDate, compare };

