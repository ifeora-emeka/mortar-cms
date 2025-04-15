import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiConfig extends AxiosRequestConfig {
  baseURL?: string;
  timeout?: number;
  withCredentials?: boolean;
}

export function createApi(config?: ApiConfig): AxiosInstance {
  const defaultConfig = {
    baseURL: process.env.API_URL || '/api',
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    withCredentials: false,
  };

  const instance = axios.create({
    ...defaultConfig,
    ...config,
  });

  instance.interceptors.request.use(
    (config) => {
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    }
  );

  return instance;
}

const api = createApi();
export default api;