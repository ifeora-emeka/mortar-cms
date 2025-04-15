import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
  CancelTokenSource,
} from 'axios';

// Types for our API client
export interface ApiClientConfig extends AxiosRequestConfig {
  baseURL?: string;
  timeout?: number;
  withCredentials?: boolean;
}

export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
}

export interface ApiError {
  message: string;
  code?: string | number;
  status?: number;
  data?: any;
}

/**
 * Creates and configures an Axios instance for API requests
 */
export class ApiClient {
  private client: AxiosInstance;
  private cancelTokenSources: Map<string, CancelTokenSource> = new Map();

  /**
   * Creates a new ApiClient instance
   * @param config - Configuration for the axios instance
   */
  constructor(config?: ApiClientConfig) {
    // Default configuration
    const defaultConfig: ApiClientConfig = {
      baseURL: process.env.API_URL || '/api',
      timeout: 30000, // 30 seconds
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      withCredentials: false,
    };

    // Create axios instance with merged config
    this.client = axios.create({
      ...defaultConfig,
      ...config,
    });

    // Setup interceptors
    this.setupInterceptors();
  }

  /**
   * Setup request and response interceptors
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        // Get token from localStorage or any other storage
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
        
        // If token exists, add it to the headers
        if (token) {
          config.headers = config.headers || {};
          config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
      },
      (error) => Promise.reject(this.handleError(error))
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Check if we need to refresh the token
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            // Implement your token refresh logic here
            // const newToken = await this.refreshToken();
            // localStorage.setItem('auth-token', newToken);
            // originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
            // return this.client(originalRequest);
          } catch (refreshError) {
            // Handle refresh token failure
            return Promise.reject(this.handleError(refreshError));
          }
        }
        return Promise.reject(this.handleError(error));
      }
    );
  }

  /**
   * Handle and normalize errors
   * @param error - Error from axios
   * @returns Normalized ApiError
   */
  private handleError(error: AxiosError | any): ApiError {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message || error.message || 'Unknown error occurred',
        code: error.response?.data?.code || error.code,
        status: error.response?.status,
        data: error.response?.data,
      };
    }
    return {
      message: error.message || 'Unknown error occurred',
      code: error.code,
    };
  }

  /**
   * Create a cancel token for a request
   * @param requestId - Unique identifier for the request
   * @returns CancelToken
   */
  public createCancelToken(requestId: string): CancelToken {
    // Cancel previous request with the same ID if it exists
    this.cancelRequest(requestId);
    
    // Create a new cancel token source
    const source = axios.CancelToken.source();
    this.cancelTokenSources.set(requestId, source);
    
    return source.token;
  }

  /**
   * Cancel a request by ID
   * @param requestId - Unique identifier for the request
   */
  public cancelRequest(requestId: string): void {
    const source = this.cancelTokenSources.get(requestId);
    if (source) {
      source.cancel(`Request ${requestId} cancelled`);
      this.cancelTokenSources.delete(requestId);
    }
  }

  /**
   * Cancel all pending requests
   */
  public cancelAllRequests(): void {
    this.cancelTokenSources.forEach((source, id) => {
      source.cancel(`Request ${id} cancelled`);
    });
    this.cancelTokenSources.clear();
  }

  /**
   * Make a GET request
   * @param url - URL to request
   * @param config - Axios request config
   * @returns Promise with the response
   */
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.get<T>(url, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Make a POST request
   * @param url - URL to request
   * @param data - Data to send
   * @param config - Axios request config
   * @returns Promise with the response
   */
  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.post<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Make a PUT request
   * @param url - URL to request
   * @param data - Data to send
   * @param config - Axios request config
   * @returns Promise with the response
   */
  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.put<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Make a DELETE request
   * @param url - URL to request
   * @param config - Axios request config
   * @returns Promise with the response
   */
  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.delete<T>(url, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Make a PATCH request
   * @param url - URL to request
   * @param data - Data to send
   * @param config - Axios request config
   * @returns Promise with the response
   */
  public async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.client.patch<T>(url, data, config);
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Make a request with retry mechanism
   * @param method - HTTP method
   * @param url - URL to request
   * @param options - Options including data and config
   * @param retries - Number of retries
   * @param delay - Delay between retries in ms
   * @returns Promise with the response
   */
  public async requestWithRetry<T = any>(
    method: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    options: { data?: any; config?: AxiosRequestConfig } = {},
    retries = 3,
    delay = 300
  ): Promise<ApiResponse<T>> {
    try {
      let response: AxiosResponse<T>;
      
      switch (method) {
        case 'get':
          response = await this.client.get<T>(url, options.config);
          break;
        case 'post':
          response = await this.client.post<T>(url, options.data, options.config);
          break;
        case 'put':
          response = await this.client.put<T>(url, options.data, options.config);
          break;
        case 'delete':
          response = await this.client.delete<T>(url, options.config);
          break;
        case 'patch':
          response = await this.client.patch<T>(url, options.data, options.config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      
      return {
        data: response.data,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
      };
    } catch (error) {
      if (retries > 0) {
        // Wait for the specified delay
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Exponential backoff
        return this.requestWithRetry(
          method,
          url,
          options,
          retries - 1,
          delay * 2
        );
      }
      
      throw this.handleError(error);
    }
  }

  /**
   * Access the underlying axios instance directly
   * @returns The axios instance
   */
  public getInstance(): AxiosInstance {
    return this.client;
  }
}

// Create and export a default instance
const api = new ApiClient();
export default api;

// Also export a factory function to create custom instances
export function createApiClient(config?: ApiClientConfig): ApiClient {
  return new ApiClient(config);
}