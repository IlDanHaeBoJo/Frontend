import axios from "axios";
import { getAccessToken } from "../store/tokenManager";

const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

// Instance for public requests (e.g., login, signup)
export const publicApi = axios.create({
  baseURL,
});

// Instance for authenticated requests
export const api = axios.create({
  baseURL,
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    console.log('Request Headers:', config.headers);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response:', response.status, response.config.url);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    console.error('Error Config:', error.config);
    console.error('Error Response:', error.response);
    return Promise.reject(error);
  }
);

// Export all API modules
export * from './file';
export * from './attachment';
export * from './notice';
