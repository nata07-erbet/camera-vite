import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCameras,
  fetchCamera,
  fetchSimilars,
  fetchPromos,
  fetchReviews,
  addToBasket,
  delFromBasket,
  incrementAction,
  decrementAction,
  postReviews,
  postCoupon,
  postOrder
} from './action.ts'
import { TCamera, TReview, TCouponValue, TOrder, TPromo, TBasket } from "../types/types.ts";
import { cameraMocks } from '../mocks/camera-mocks.ts';
import { reviewMocks } from '../mocks/review-mocks.ts';
import { promoMocks } from  '../mocks/promo-mocks.ts';

const initialState: {
  cameras: TCamera[],
  camera: TCamera | null,
  similars: TCamera[],
  promos: TPromo[],
  reviews: TReview[],
  coupon: TCouponValue | null,
  order: TOrder | null
  baskets: TCamera[],
  counter: number

} = {
  cameras: [],
  camera: null,
  similars: [],
  promos: [],
  reviews: [],
  coupon: null,
  order: null,
  baskets: [],
  counter: 0
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCameras, (state) => {
      state.cameras = cameraMocks;
  })
    .addCase(fetchCamera, (state, action) => {
        state.camera = cameraMocks.find((camera) => camera.id === action.payload) ?? null
    })

    .addCase(fetchSimilars, (state) => {
      state.similars = cameraMocks.slice(2,7);
    })
    .addCase(fetchReviews, (state) => {
      state.reviews = reviewMocks;
    })
    .addCase(fetchPromos, (state) => {
      state.promos = promoMocks;
    })
    .addCase(addToBasket, (state, action) => {
      const cameraIntoBasket = state.cameras.find((camera) => camera.id === action.payload);

      if(cameraIntoBasket) {
        state.baskets.push(cameraIntoBasket);
      };

      state.counter =  state.counter + 1;
    })
    .addCase(delFromBasket, (state, action) => {
      const cameraFromBasket = state.baskets.find((camera) => camera.id === action.payload) ?? null;
      state.baskets =  state.baskets.filter((camera) => camera !== cameraFromBasket);

      state.counter =  state.counter - 1;
    })
    .addCase(incrementAction, (state) => {
      state.counter =  state.counter - 1;
    });
});

export { reducer }
