import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authApi = {
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  signup: async (data: { email: string; password: string; fullName: string }) => {
    const response = await api.post('/auth/signup', data);
    return response.data;
  },

  forgotPassword: async (data: { email: string }) => {
    const response = await api.post('/auth/forgot-password', data);
    return response.data;
  },

  resetPassword: async (token: string, data: { password: string }) => {
    const response = await api.post(`/auth/reset-password/${token}`, data);
    return response.data;
  },

  verifyEmail: async (token: string) => {
    const response = await api.post(`/auth/verify-email/${token}`);
    return response.data;
  },

  refreshToken: async (token: string) => {
    const response = await api.post('/auth/refresh-token', { token });
    return response.data;
  },
};

export default api; 