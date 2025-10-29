import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice.ts';
import wishlistReducer from './slices/wishlistSlice.ts';
import userReducer from './slices/userSlice.ts';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;