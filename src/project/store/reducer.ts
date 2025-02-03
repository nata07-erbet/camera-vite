import { createReducer } from "@reduxjs/toolkit";
import {
  fetchCameras,
  fetchCamera,
  fetchSimilars,
  fetchPromos,
  fetchReviews,
  getCamerasWithNewProps,
  addToBasket,
  delFromBasket,
  upDateQuantity,
  postReviews,
  postCoupon,
  postOrder
} from './action.ts'
import { TCamera, TBasket, TReview, TCouponValue, TOrder, TPromo } from "../types/types.ts";
import { cameraMocks } from '../mocks/camera-mocks.ts';
import { reviewMocks } from '../mocks/review-mocks.ts';
import { promoMocks } from  '../mocks/promo-mocks.ts';
import { addProperty } from  '../utils/utils.ts'

const initialState: {
  cameras: TCamera[],
  camerasWithNewProps: TBasket[],
  camera: TCamera | null,
  cameraIntoBasket: TBasket | null,
  cameraFromBasket: TBasket | null,
  similars: TCamera[],
  promos: TPromo[],
  reviews: TReview[],
  coupon: TCouponValue | null,
  order: TOrder | null
  baskets: TBasket[],
  counter: number

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
};


const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchCameras, (state) => {
      state.cameras = cameraMocks;
  })
    .addCase(getCamerasWithNewProps, (state) => {
      state.camerasWithNewProps = addProperty(cameraMocks);
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
      const cameraIntoBasket = state.camerasWithNewProps.find((camera) => camera.id === action.payload);

      if (cameraIntoBasket) {
        state.baskets.push(cameraIntoBasket);
        state.cameraIntoBasket = cameraIntoBasket;
        state.cameraIntoBasket.quantity = state.cameraIntoBasket.quantity + 1;
        state.cameraIntoBasket.isAdded = true;
      };

      state.counter =  state.counter + 1;

    })
    .addCase(delFromBasket, (state, action) => {
      const cameraFromBasket = state.baskets.find((camera) => camera.id === action.payload) ?? null;
      state.cameraFromBasket = cameraFromBasket;

      state.baskets =  state.baskets.filter((camera) => camera !== cameraFromBasket);

      if( state.cameraFromBasket) {
        state.cameraFromBasket.quantity = state.cameraFromBasket.quantity  - 1;
      };

      state.counter =  state.counter - 1;
    })
    .addCase(upDateQuantity, (state, action) => {
      const { id, quantity } = action.payload;

      const cameraForUpdateQuantity = state.camerasWithNewProps.find((camera) => camera.id === id);

      if(cameraForUpdateQuantity) {
        const quantityDiff = quantity - cameraForUpdateQuantity.quantity;
        cameraForUpdateQuantity.quantity = quantity;

        state.counter =  state.counter + quantityDiff;
      };
    });
});

export { reducer }
