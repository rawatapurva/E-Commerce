// src/utils/cartApi.js
import API from './api';

export const getCart = () => API.get('/cart');
export const addCartItem = (item) => API.post('/cart', { item });
export const removeCartItem = (productId) => API.delete(`/cart/${productId}`);
export const replaceCart = (cart) => API.put('/cart', { cart });
export const clearCart = () => API.post('/cart/clear');
