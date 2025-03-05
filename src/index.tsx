import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './project/store/index';
import { App } from './project/components/app/app';
import { Error } from './project/components/error/error';
import { fetchCameras } from './project/store/api-actions';

store.dispatch(fetchCameras());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Error />
    </Provider>
  </React.StrictMode>
);
