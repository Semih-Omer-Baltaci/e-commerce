import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axios';

// Get initial state from localStorage
const getInitialState = () => {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    let currentUser = null;
    if (userStr) {
        try {
            currentUser = JSON.parse(userStr);
        // eslint-disable-next-line no-unused-vars
        } catch (e) {
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }

    if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    return {
        currentUser,
        token,
        loading: false,
        error: null
    };
};

export const loginUser = createAsyncThunk(
    'user/login',
    async ({ email, password, gravatarUrl }, { rejectWithValue }) => {
        try {
            const response = await api.post('/login', { email, password });
            
            if (!response.data || !response.data.token) {
                throw new Error('Invalid response from server');
            }

            const token = response.data.token;
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            const user = {
                email,
                gravatarUrl,
                role: response.data.role,
                id: response.data.id,
                name: response.data.name || email.split('@')[0]
            };

            // Store in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            return { user, token };
        } catch (error) {
            console.error('Login error:', error);
            return rejectWithValue(
                error.response?.data?.message || 
                error.message || 
                'Login failed'
            );
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(),
    reducers: {
        logout(state) {
            state.currentUser = null;
            state.token = null;
            state.error = null;
            // Clear localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Clear Authorization header
            delete api.defaults.headers.common['Authorization'];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.currentUser = null;
                state.token = null;
                // Clear localStorage on login failure
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
