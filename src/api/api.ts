import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "https://lookthis-back-7b143ea18689.herokuapp.com/api";

const defaultConfig: AxiosRequestConfig = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "accept": "*/*"
  },
  withCredentials: true
};

// Helper function to get access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Function to check if we're on auth pages
const isAuthPage = () => {
  return window.location.pathname.includes('/sign-in') || 
         window.location.pathname.includes('/sign-up') ||
         window.location.pathname.includes('/forgot-password');
};

export const api = {
  get: async (url: string, config: AxiosRequestConfig = {}) => {
    try {
      const accessToken = getAccessToken();
      const response = await axios.get(`${BASE_URL}${url}`, {
        ...defaultConfig,
        ...config,
        headers: {
          ...defaultConfig.headers,
          ...config.headers,
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!isAuthPage()) {
          // Clear tokens on unauthorized
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/sign-in';
        }
      }
      throw error;
    }
  },

  post: async (url: string, data?: any, config: AxiosRequestConfig = {}) => {
    try {
      const accessToken = getAccessToken();
      const response = await axios.post(`${BASE_URL}${url}`, data, {
        ...defaultConfig,
        ...config,
        headers: {
          ...defaultConfig.headers,
          ...config.headers,
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!isAuthPage()) {
          // Clear tokens on unauthorized
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/sign-in';
        }
      }
      throw error;
    }
  },

  put: async (url: string, data?: any, config: AxiosRequestConfig = {}) => {
    try {
      const accessToken = getAccessToken();
      const response = await axios.put(`${BASE_URL}${url}`, data, {
        ...defaultConfig,
        ...config,
        headers: {
          ...defaultConfig.headers,
          ...config.headers,
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        if (!isAuthPage()) {
          // Clear tokens on unauthorized
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.href = '/sign-in';
        }
      }
      throw error;
    }
  },

  options: async (url: string, config: AxiosRequestConfig = {}) => {
    try {
      const response = await axios.options(`${BASE_URL}${url}`, {
        ...defaultConfig,
        ...config,
        headers: {
          ...defaultConfig.headers,
          ...config.headers
        }
      });
      return response.data;
    } catch (error) {
      console.error('OPTIONS request failed:', error);
      throw error;
    }
  }
};