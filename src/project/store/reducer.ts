import { createReducer } from '@reduxjs/toolkit';
import {
  fetchCamera,
  loadedReviews,
  getCamerasWithNewProps,
  addToBasket,
  delFromBasket,
  upDateQuantity,
  upDatePage,
  loadedCameras,
  loadedSimilar,
  loadedPromo,
  sendedCoupon,
  setError,
  isLoadingCameras,
  setStatus,
  // fetchPromos,
  // fetchReviews,
  // postReviews,
  // postCoupon,
  // postOrder
} from './action.ts';
import {
  TCamera,
  TBasket,
  TReview,
  TCouponValue,
  TOrder,
  TPromo,
  TPromoCoupon,
} from '../types/types.ts';
import { cameraMocks } from '../mocks/camera-mocks.ts';
import { addProperty } from '../utils/utils.ts';
import { CATALOG_SHOW } from '../const/const.ts';

const initialState: {
  cameras: TCamera[];
  camerasWithNewProps: TBasket[];
  camera: TCamera | null;
  cameraIntoBasket: TBasket | null;
  cameraFromBasket: TBasket | null;
  similars: TCamera[];
  promos: TPromo[];
  reviews: TReview[];
  coupon: TCouponValue | null;
  order: TOrder | null;
  baskets: TBasket[];
  counter: number;
  currentPage: number;
  start: number;
  end: number;
  couponResponse: TPromoCoupon | null;
  error: string | null;
  isCamerasDataLoading: boolean;
  status: number;
} = {
  cameras: [],
  camerasWithNewProps: [],
  camera: null,
  cameraIntoBasket: null,
  cameraFromBasket: null,
  similars: [],
  promos: [],
  reviews: [],
  coupon: null,
  order: null,
  baskets: [],
  counter: 0,
  currentPage: 1,
  start: 0,
  end: CATALOG_SHOW,
  couponResponse: null,
  error: null,
  isCamerasDataLoading: false,
  status: 0,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadedCameras, (state, action) => {
      state.cameras = action.payload;
    })
    .addCase(loadedSimilar, (state, action) => {
      state.similars = action.payload;
    })
    // .addCase(loadedCamera, (state, action) => {
    //   state.camera = action.payload;
    // })
    .addCase(getCamerasWithNewProps, (state) => {
      state.camerasWithNewProps = addProperty(cameraMocks);
    })
    .addCase(fetchCamera, (state, action) => {
      state.camera =
        cameraMocks.find((camera) => camera.id === action.payload) ?? null;
    })
    .addCase(loadedReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadedPromo, (state, action) => {
      state.promos = action.payload;
    })
    .addCase(sendedCoupon, (state, action) => {
      state.couponResponse = action.payload;
    })
    .addCase(setStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(isLoadingCameras, (state, action) => {
      state.isCamerasDataLoading = action.payload;
    })
    // .addCase(fetchSimilars, (state) => {
    //   state.similars = cameraMocks.slice(2,7);
    // })
    // .addCase(fetchReviews, (state) => {
    //   state.reviews = reviewMocks;
    // })
    // .addCase(fetchPromos, (state) => {
    //   state.promos = promoMocks;
    // })
    .addCase(addToBasket, (state, action) => {
      const cameraIntoBasket = state.camerasWithNewProps.find(
        (camera) => camera.id === action.payload,
      );

      if (cameraIntoBasket) {
        state.baskets.push(cameraIntoBasket);
        state.cameraIntoBasket = cameraIntoBasket;
        state.cameraIntoBasket.quantity = state.cameraIntoBasket.quantity + 1;
        state.cameraIntoBasket.isAdded = true;
      }

      state.counter = state.counter + 1;
    })
    .addCase(delFromBasket, (state, action) => {
      const cameraFromBasket =
        state.baskets.find((camera) => camera.id === action.payload) ?? null;
      state.cameraFromBasket = cameraFromBasket;

      state.baskets = state.baskets.filter(
        (camera) => camera !== cameraFromBasket,
      );

      if (state.cameraFromBasket) {
        state.cameraFromBasket.quantity = state.cameraFromBasket.quantity - 1;
      }

      state.counter = state.counter - 1;
    })
    .addCase(upDateQuantity, (state, action) => {
      const { id, quantity } = action.payload;

      const cameraForUpdateQuantity = state.camerasWithNewProps.find(
        (camera) => camera.id === id,
      );

      if (cameraForUpdateQuantity) {
        const quantityDiff = quantity - cameraForUpdateQuantity.quantity;
        cameraForUpdateQuantity.quantity = quantity;

        state.counter = state.counter + quantityDiff;
      }
    })
    .addCase(upDatePage, (state, action) => {
      state.currentPage = action.payload;
    });
});

export { reducer };
