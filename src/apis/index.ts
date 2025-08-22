import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearAccessToken,
  clearRefreshToken,
} from "../store/tokenManager";

const baseURL = process.env.REACT_APP_API_URL || "http://localhost:8000";

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
    console.log("API Request:", config.method?.toUpperCase(), config.url);
    console.log("Request Headers:", config.headers);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.status, response.config.url);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        try {
          const response = await publicApi.post("/auth/refresh_token", {
            refresh_token: refreshToken,
          });
          const { access_token, refresh_token } = response.data;
          setAccessToken(access_token);
          setRefreshToken(refresh_token);
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return api(originalRequest);
        } catch (refreshError) {
          console.error("Unable to refresh token:", refreshError);
          clearAccessToken();
          clearRefreshToken();
          // Optionally, redirect to login page
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Export all API modules
export * from "./file";
export * from "./attachment";
export * from "./notice";
export * from "./scenario";
