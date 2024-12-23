import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ limit = 25, offset = 0, sort = '', filter = '', category = '' }) => {
        let url = `/products?limit=${limit}&offset=${offset}`;
        if (sort) url += `&sort=${sort}`;
        if (filter) url += `&filter=${filter}`;
        if (category) url += `&category=${category}`;
        
        const response = await api.get(url);
        return response.data;
    }
);

export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId) => {
        const response = await api.get(`/products/${productId}`);
        return response.data;
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        selectedProduct: null,
        loading: false,
        error: null,
        pagination: {
            limit: 25,
            offset: 0,
            total: 0
        },
        filters: {
            sort: '',
            filter: '',
            category: ''
        }
    },
    reducers: {
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.products || [];
                state.pagination.total = action.payload.total || 0;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export const { setFilters } = productSlice.actions;
export default productSlice.reducer;