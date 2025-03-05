import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TState, TAppDispatch } from './state';
import { AppRoutes, ERROR_TIMEOUT, NameSpace, ReqRoutes } from '../const/const';
import {
  TCamera,
  TPromo,
  TReview,
  TOrder,
  TPromoCoupon,
  TLogin,
  TUserData,
} from '../types/types';
import {
  loadedCameras,
  loadedSimilar,
  loadedPromo,
  loadedReviews,
  sendedOrder,
  sendedCoupon,
  setError,
  isLoadingCameras,
  setStatus,
  redirectToRoute,
} from './action';
import { store } from './index';

type TAsyncThunkConfig = {
  state?: TState;
  dispatch: TAppDispatch;
  extra: AxiosInstance;
};

const fetchCameras = createAsyncThunk<void, undefined, TAsyncThunkConfig>(
  `${NameSpace.Cameras}/fetchCameras`,
  async (_arg, { dispatch, extra: api }) => {
    dispatch(isLoadingCameras(true));
    const { data } = await api.get<TCamera[]>(ReqRoutes.Cameras);
    dispatch(isLoadingCameras(false));
    dispatch(loadedCameras(data));
  },
);

const fetchSimilars = createAsyncThunk<void, TCamera['id'], TAsyncThunkConfig>(
  `${NameSpace.Similar}/fetchSimilars`,
  async (cameraId, { dispatch, extra: api }) => {
    const { data } = await api.get<TCamera[]>(`/cameras/${cameraId}/similar`);
    dispatch(loadedSimilar(data));
  },
);

const fetchPromos = createAsyncThunk<void, undefined, TAsyncThunkConfig>(
  `${NameSpace.Promo}/fetchPromos`,
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<TPromo[]>(ReqRoutes.Promo);
    dispatch(loadedPromo(data));
  },
);

const fetchReviews = createAsyncThunk<void, TCamera['id'], TAsyncThunkConfig>(
  `${NameSpace.Reviews}/fetchReviews`,
  async (cameraId, { dispatch, extra: api }) => {
    const { data } = await api.get<TReview[]>(`/cameras/${cameraId}/reviews`);
    dispatch(loadedReviews(data));
  },
);

const postOrder = createAsyncThunk<void, TOrder, TAsyncThunkConfig>(
  `${NameSpace.Order}/postOrder`,
  async ({ camerasIds, coupon }, { dispatch, extra: api }) => {
    const { data } = await api.post<TOrder>('/orders', { camerasIds, coupon });
    dispatch(sendedOrder(data));
  },
);

const postCoupon = createAsyncThunk<void, TPromoCoupon, TAsyncThunkConfig>(
  `${NameSpace.Coupon}/postCoupon`,
  async ({ coupon }, { dispatch, extra: api }) => {
    const { data } = await api.post('/coupons', { coupon });
    dispatch(sendedCoupon(data));
  },
);

const clearError = createAsyncThunk(NameSpace.ClearError, () => {
  setTimeout(() => {
    store.dispatch(setError(null));
  }, ERROR_TIMEOUT);
});

const loginAction = createAsyncThunk<void, TLogin, TAsyncThunkConfig>(
  NameSpace.PostLogin,
  async ({ login: email, password: password }, { dispatch, extra: api }) => {
    const { status } = await api.post<TUserData>('/coupons', {
      email,
      password,
    });
    dispatch(setStatus(status));
    dispatch(redirectToRoute(AppRoutes.Main));
  },
);

// const fetchCamera = createAsyncThunk<void, undefined, TAsyncThunkConfig>(
//   `${NameSpace.Camera}/fetchCamera`,
//   async (_arg, ({ dispatch, extra: api  })) => {
//     const { data } =  await api.get(ReqRoutes.)
//   }
// );

export {
  fetchCameras,
  fetchSimilars,
  fetchPromos,
  fetchReviews,
  postOrder,
  postCoupon,
  clearError,
  loginAction,
};
