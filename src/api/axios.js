import axios from 'axios';

const api = axios.create({
    baseURL: 'https://workintech-fe-ecommerce.onrender.com'
});

// Token'ı localStorage'dan al ve header'a ekle
const token = localStorage.getItem('token');
if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Response interceptor ekle
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
