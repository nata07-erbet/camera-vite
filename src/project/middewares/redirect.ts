import { Middleware, PayloadAction } from '@reduxjs/toolkit';
import { reducer } from '../store/reducer';
import { browserHistory } from '../browser-histoty';

type TReducer = ReturnType<typeof reducer>;

const redirect: Middleware<unknown, TReducer> =
  () => (next) => (action: PayloadAction<string>) => {
    if (action.type === 'redirect') {
      return browserHistory.push(action.payload);
    }
    return next(action);
  };

export { redirect };
