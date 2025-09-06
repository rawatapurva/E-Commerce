import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './Slices/CartSlice'; // default export

export const store = configureStore({
  reducer: {
    cart: cartReducer
  }
});
