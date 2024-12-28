import axios from 'axios';
import store from '../redux/store';

const api = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.token;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle 401 errors globally here if needed
      // For example, you could dispatch a logout action
      // store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

export default api;
