import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { TState, TAppDispatch } from './state';
import {
  AppRoutes,
  ERROR_TIMEOUT,
  NameSpace,
  ReqRoutes,
  AuthorizationStatus,
} from '../const/const';
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
  requireStatus,
} from './action';
import { store } from './index';
import { dropToken, saveToken } from './token';

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

const checkAuthStatus = createAsyncThunk<void, undefined, TAsyncThunkConfig>(
  NameSpace.AuthStatus,
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get(ReqRoutes.AuthStatus);
      dispatch(requireStatus(AuthorizationStatus.Authorized));
    } catch {
      dispatch(requireStatus(AuthorizationStatus.Denied));
    }
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

const clearError = createAsyncThunk('error', () => {
  setTimeout(() => {
    store.dispatch(setError(null));
  }, 2000);
});

const loginAction = createAsyncThunk<void, TLogin, TAsyncThunkConfig>(
  `${NameSpace.User}/login`,
  async ({ login, password }, { dispatch, extra: api }) => {
    const {
      data: { token },
    } = await api.post<TUserData>(ReqRoutes.Login, { login, password });
    saveToken(token);

    dispatch(requireStatus(AuthorizationStatus.Authorized));
  },
);

const logoutAction = createAsyncThunk<void, undefined, TAsyncThunkConfig>(
  `${NameSpace.User}/logout`,
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ReqRoutes.Logout);
    dropToken();
    dispatch(requireStatus(AuthorizationStatus.Revoked));
  },
);

export {
  fetchCameras,
  fetchSimilars,
  fetchPromos,
  fetchReviews,
  postOrder,
  postCoupon,
  clearError,
  loginAction,
  logoutAction,
  checkAuthStatus,
};
