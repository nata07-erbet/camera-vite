import { reducer } from './reducer.ts';
import { createAPI } from '../api/api.ts';
// import { redirect } from '../middewares/redirect.ts';

import { configureStore } from '@reduxjs/toolkit';

const api = createAPI();

//thunk = middleware
// thunk подклоючаем на этапе конфигурации хранилища

const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});

export { store };
