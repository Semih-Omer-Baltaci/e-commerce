import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cart: [],
    loading: false,
    error: null
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cart.find(item => item.product.id === action.payload.id);
            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.cart.push({ 
                    count: 1, 
                    checked: true, 
                    product: action.payload 
                });
            }
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.product.id !== action.payload);
        },
        updateCount: (state, action) => {
            const { productId, count } = action.payload;
            const item = state.cart.find(item => item.product.id === productId);
            if (item) {
                item.count = count;
            }
        },
        toggleChecked: (state, action) => {
            const item = state.cart.find(item => item.product.id === action.payload);
            if (item) {
                item.checked = !item.checked;
            }
        },
        clearCart: (state) => {
            state.cart = [];
        }
    }
});

export const { addToCart, removeFromCart, updateCount, toggleChecked, clearCart } = cartSlice.actions;
export default cartSlice.reducer;