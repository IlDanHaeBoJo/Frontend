import axios from "axios";
import { getAccessToken } from "../store/tokenManager";

// const baseURL = process.env.REACT_APP_API_URL;
const baseURL = "http://localhost:8001";

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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
