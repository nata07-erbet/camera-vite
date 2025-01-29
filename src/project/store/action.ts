import { createAction } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { TCamera, TBasket } from '../types/types';

const fetchCameras = createAction(`${NameSpace.Cameras}/fetchCameras`);
const fetchCamera = createAction<TCamera['id']>(`${NameSpace.Camera}/fetchCamera`);
const fetchSimilars = createAction<TCamera['id']>(`${NameSpace.Similar}/fetchSimilars`);
const fetchPromos = createAction(`${NameSpace.Promo}/fetchPromos`);
const fetchReviews = createAction<TCamera['id']>(`${NameSpace.Reviews}/fetchReviews`);
const postReviews = createAction(`${NameSpace.Reviews}/postReviews`);
const postCoupon = createAction(`${NameSpace.Coupon}/postCoupon`);
const postOrder = createAction(`${NameSpace.Order}/postCoupon`);

const addToBasket = createAction<TCamera['id']>(`${NameSpace.ToBasket}`);
const delFromBasket = createAction<TCamera['id']>(`${NameSpace.FromBasket}`);
const totalQuantity = createAction(NameSpace.TotalQuantity);

const incrementAction = createAction(NameSpace.Inc);
const decrementAction = createAction(NameSpace.Dec);

export { fetchCameras, fetchCamera, fetchSimilars, fetchPromos, fetchReviews, postReviews, postCoupon, postOrder, addToBasket, delFromBasket, totalQuantity, incrementAction, decrementAction };
