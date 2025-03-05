import { createAction } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import {
  TCamera,
  TQuantity,
  TPromo,
  TReview,
  TOrder,
  TPromoCoupon,
} from '../types/types';
const fetchCamera = createAction<TCamera['id']>(
  `${NameSpace.Camera}/fetchCamera`,
);
const postReviews = createAction(`${NameSpace.Reviews}/postReviews`);

const addToBasket = createAction<TCamera['id']>(`${NameSpace.ToBasket}`);
const getCamerasWithNewProps = createAction(`${NameSpace.CamerasWithProps}`);
const delFromBasket = createAction<TCamera['id']>(`${NameSpace.FromBasket}`);
const totalQuantity = createAction(NameSpace.TotalQuantity);
const upDateQuantity = createAction<TQuantity>(NameSpace.UpDateQuantity);
const upDatePage = createAction<number>(NameSpace.Page);

const loadedCameras = createAction<TCamera[]>(NameSpace.LoadedCameras);
const loadedCamera = createAction<TCamera>(NameSpace.Camera);
const loadedSimilar = createAction<TCamera[]>(NameSpace.LoadedSimilar);
const loadedPromo = createAction<TPromo[]>(NameSpace.LoadedPromo);
const loadedReviews = createAction<TReview[]>(NameSpace.LoadedReviews);

const sendedOrder = createAction<TOrder>(NameSpace.SendedOrder);
const sendedCoupon = createAction<TPromoCoupon>(NameSpace.SendedCoupon);
const setError = createAction<string | null>(NameSpace.Error);
const isLoadingCameras = createAction<boolean>(NameSpace.isLoadingCameras);
const setStatus = createAction<number>(NameSpace.SendedLogin);
const redirectToRoute = createAction<string>(NameSpace.Redirect);

// const incrementAction = createAction(NameSpace.Inc);
// const decrementAction = createAction(NameSpace.Dec);

// const incrementAction = createAction(NameSpace.Inc);
// const decrementAction = createAction(NameSpace.Dec);
export {
  fetchCamera,
  postReviews,
  addToBasket,
  delFromBasket,
  totalQuantity,
  upDateQuantity,
  getCamerasWithNewProps,
  upDatePage,
  loadedCameras,
  loadedCamera,
  loadedSimilar,
  loadedPromo,
  loadedReviews,
  sendedOrder,
  sendedCoupon,
  setError,
  isLoadingCameras,
  setStatus,
  redirectToRoute,
};
