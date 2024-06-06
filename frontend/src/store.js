import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice';
import orderReducer from './features/orderSlice';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage

const persistCartConfig = {
  key: 'cart',
  storage,
};
const persistOrderConfig = {
  key: 'order',
  storage,
};


const persistedCartReducer = persistReducer(persistCartConfig, cartReducer);
const persistedOrderReducer = persistReducer(persistOrderConfig, orderReducer);

export const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    order: persistedOrderReducer,
  },
});
export const persistor = persistStore(store);



// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './features/cartSlice';
// import orderReducer from './features/orderSlice';

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//     order: orderReducer,
//   },
// });

// export default store;

// index.js

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
// import { store, persistor } from './store';
// import App from './App';

// ReactDOM.render(
//   <Provider store={store}>
//     <PersistGate loading={null} persistor={persistor}>
//       <App />
//     </PersistGate>
//   </Provider>,
//   document.getElementById('root')
// );

