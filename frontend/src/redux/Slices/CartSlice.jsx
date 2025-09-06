import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 
import API from '../../utils/api';

// Load from localStorage helper
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

// Save to localStorage helper
const saveCartToStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

// Thunks
export const fetchCart = createAsyncThunk('cart/fetchCart', async (_, { rejectWithValue }) => {
  try {
    const res = await API.get('/cart');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const addItemToServer = createAsyncThunk('cart/addItem', async (item, { rejectWithValue }) => {
  try {
    const res = await API.post('/cart', { item });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const removeItemFromServer = createAsyncThunk('cart/removeItem', async (productId, { rejectWithValue }) => {
  try {
    const res = await API.delete(`/cart/${productId}`);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const clearCartOnServer = createAsyncThunk('cart/clearCart', async (_, { rejectWithValue }) => {
  try {
    const res = await API.post('/cart/clear');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: loadCartFromStorage(), // ✅ Load cart from localStorage initially
    status: 'idle',
    error: null
  },
  reducers: {
    setCart(state, action) {
      state.items = action.payload;
      saveCartToStorage(state.items); // ✅ Sync with localStorage
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchCart.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.items = action.payload;
        saveCartToStorage(state.items); // ✅ Sync after fetch
      })
      .addCase(fetchCart.rejected, (state, action) => { state.status = 'failed'; state.error = action.payload; })

      .addCase(addItemToServer.fulfilled, (state, action) => { 
        state.items = action.payload;
        saveCartToStorage(state.items); // ✅ Sync after add
      })
      .addCase(removeItemFromServer.fulfilled, (state, action) => { 
        state.items = action.payload;
        saveCartToStorage(state.items); // ✅ Sync after remove
      })
      .addCase(clearCartOnServer.fulfilled, (state, action) => { 
        state.items = action.payload;
        saveCartToStorage(state.items); // ✅ Sync after clear
      });
  }
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;

