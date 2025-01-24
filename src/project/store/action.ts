import { createAction } from '@reduxjs/toolkit';
import { NameSpace } from '../const/const';
import { TCamera } from '../types/types';

const fetchCameras = createAction<TCamera[]>(`${NameSpace.Cameras}/fetchCameras`);
const fetchCamera = createAction<TCamera['id']>(`${NameSpace.Camera}/fetchCamera`);
const fetchSimilars = createAction<TCamera[]>(`${NameSpace.Similar}/fetchSimilars`);
const fetchPromos = createAction<TCamera[]>(`${NameSpace.Promo}/fetchPromos`);
const fetchReviews = createAction<TCamera[]>(`${NameSpace.Reviews}/fetchReviews`);
const postReviews = createAction<TCamera[]>(`${NameSpace.Reviews}/postReviews`);
const postCoupon = createAction<TCamera[]>(`${NameSpace.Coupon}/postCoupon`);
const postOrder = createAction<TCamera[]>(`${NameSpace.Order}/postCoupon`);

export { fetchCameras, fetchCamera, fetchSimilars, fetchPromos, fetchReviews, postReviews, postCoupon, postOrder };
