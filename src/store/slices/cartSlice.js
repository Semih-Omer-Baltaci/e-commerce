import { createSlice } from '@reduxjs/toolkit';

// Load cart from localStorage if it exists
const loadCartFromStorage = () => {
    try {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
        console.error('Error loading cart from localStorage:', error);
        return [];
    }
};

const initialState = {
    cart: loadCartFromStorage(),
    loading: false,
    error: null
};

// Helper function to save cart to localStorage
const saveCartToStorage = (cart) => {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
        console.error('Error saving cart to localStorage:', error);
    }
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
            saveCartToStorage(state.cart);
        },
        removeFromCart: (state, action) => {
            state.cart = state.cart.filter(item => item.product.id !== action.payload);
            saveCartToStorage(state.cart);
        },
        updateCount: (state, action) => {
            const { productId, count } = action.payload;
            const item = state.cart.find(item => item.product.id === productId);
            if (item) {
                item.count = count;
            }
            saveCartToStorage(state.cart);
        },
        toggleChecked: (state, action) => {
            const item = state.cart.find(item => item.product.id === action.payload);
            if (item) {
                item.checked = !item.checked;
            }
            saveCartToStorage(state.cart);
        },
        clearCart: (state) => {
            state.cart = [];
            saveCartToStorage(state.cart);
        }
    }
});

export const { addToCart, removeFromCart, updateCount, toggleChecked, clearCart } = cartSlice.actions;
export default cartSlice.reducer;