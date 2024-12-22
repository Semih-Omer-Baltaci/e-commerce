import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import userReducer from './slices/userSlice';
import cartReducer from './slices/cartSlice';
import productReducer from './slices/productSlice';
import categoriesReducer from './slices/categoriesSlice';

const logger = createLogger({
    collapsed: true,
    duration: true,
    timestamp: true
});

const middleware = (getDefaultMiddleware) => 
    // eslint-disable-next-line no-undef
    process.env.NODE_ENV === 'development' 
        ? getDefaultMiddleware().concat(logger)
        : getDefaultMiddleware();

export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        products: productReducer,
        categories: categoriesReducer
    },
    middleware
});

export default store;