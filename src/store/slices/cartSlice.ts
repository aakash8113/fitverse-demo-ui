import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find((item: CartItem) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.total = state.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    },
    removeFromCart: (state: CartState, action: PayloadAction<number>) => {
      state.items = state.items.filter((item: CartItem) => item.id !== action.payload);
      state.total = state.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
    },
    updateQuantity: (state: CartState, action: PayloadAction<{ id: number; quantity: number }>) => {
      const item = state.items.find((item: CartItem) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
        state.total = state.items.reduce((sum: number, item: CartItem) => sum + (item.price * item.quantity), 0);
      }
    },
    clearCart: (state: CartState) => {
      state.items = [];
      state.total = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;