import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer.ts';
import { createAPI } from '../api/api.ts';
import { redirect } from '../middewares/redirect.ts';

const api = createAPI();

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect),
});
export { api, store };
