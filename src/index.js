import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import productsReducer, { productsFetch } from './features/productsSlice';
import cartReducer, { getTotals } from './features/cartSlice';

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer
  }
})

store.dispatch(productsFetch());
store.dispatch(getTotals());

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
