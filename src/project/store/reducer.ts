import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCameras,
  fetchCamera,
  fetchSimilars,
  fetchPromos,
  fetchReviews,
  addToBasket,
  delFromBasket,
  upDateQuantity,
  postReviews,
  postCoupon,
  postOrder
} from './action.ts'
import { TCamera, TReview, TCouponValue, TOrder, TPromo } from "../types/types.ts";
import { cameraMocks } from '../mocks/camera-mocks.ts';
import { reviewMocks } from '../mocks/review-mocks.ts';
import { promoMocks } from  '../mocks/promo-mocks.ts';

const initialState: {
  cameras: TCamera[],
  camera: TCamera | null,
  cameraIntoBasket: TCamera | null,
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
  cameraIntoBasket: null,
  similars: [],
  promos: [],
  reviews: [],
  coupon: null,
  order: null,
  baskets: [],
  counter: 0,
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

      if (cameraIntoBasket) {
        state.baskets.push(cameraIntoBasket);
        state.cameraIntoBasket = cameraIntoBasket;
        state.cameraIntoBasket.isAdded = true;
      };

      state.counter =  state.counter + 1;

    })
    .addCase(delFromBasket, (state, action) => {
      const cameraFromBasket = state.baskets.find((camera) => camera.id === action.payload) ?? null;
      state.baskets =  state.baskets.filter((camera) => camera !== cameraFromBasket);

      state.counter =  state.counter - 1;
    })
    .addCase(upDateQuantity, (state, action) => {
      const { id, quantity } = action.payload;

      const cameraForUpdateQuantity = state.cameras.find((camera) => camera.id === id);

      if(cameraForUpdateQuantity) {
        const quantityDiff = quantity - cameraForUpdateQuantity.quantity;
        cameraForUpdateQuantity.quantity = quantity;

        state.counter =  state.counter + quantityDiff;
      };
    });
});

export { reducer }
