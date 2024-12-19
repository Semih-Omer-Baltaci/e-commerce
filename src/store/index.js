import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        products: productReducer
    }
});

export default store;