import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import type { ShipXConfig } from '../types/config';
import { AuthManager } from '../auth/auth-manager';
import { DEFAULT_CONFIG, RETRY_CONFIG } from '../utils/config/defaults';
import { buildGatewayUrl, buildUrl } from '../utils/api';
import { handleError } from './error-handler';
import {
  calculateRetryDelay,
  sleep,
  isMethodRetryable,
} from './retry-strategy';

export class InPostClient {
  private readonly httpClient: AxiosInstance;
  private readonly httpGatewayClient: AxiosInstance;
  private readonly authManager: AuthManager;
  private readonly environment: 'sandbox' | 'production';
  private readonly maxRetries: number;
  private readonly retryDelay: number;
  private readonly retryableStatusCodes: readonly number[];
  private readonly retryableHttpMethods: readonly string[];

  constructor(config: ShipXConfig) {
    this.authManager = new AuthManager(config);
    this.environment = config.environment;
    this.maxRetries = config.maxRetries ?? RETRY_CONFIG.maxRetries;
    this.retryDelay = config.retryDelay ?? RETRY_CONFIG.retryDelay;
    this.retryableStatusCodes =
      config.retryableStatusCodes ?? RETRY_CONFIG.retryableStatusCodes;
    this.retryableHttpMethods = (
      config.retryableHttpMethods ?? RETRY_CONFIG.retryableHttpMethods
    ).map(m => m.toUpperCase());

    const axiosDefaults = {
      timeout: config.timeout || DEFAULT_CONFIG.timeout,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    this.httpClient = axios.create({
      baseURL: buildUrl(this.environment, ''),
      ...axiosDefaults,
    });

    this.httpGatewayClient = axios.create({
      baseURL: buildGatewayUrl(this.environment, ''),
      ...axiosDefaults,
    });
    this.setupInterceptor(this.httpClient);
    this.setupInterceptor(this.httpGatewayClient);
  }

  /**
   * Setup Axios interceptors for request and response handling
   */
  private setupInterceptor(instance: AxiosInstance): void {
    //Add access token to each request
    instance.interceptors.request.use(
      async config => {
        const accessToken = await this.authManager.getAccessToken();
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
      },
      error => Promise.reject(error),
    );

    // RESPONSE INTERCEPTOR - Handle errors
    instance.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        const config = error.config;
        const status = error.response?.status;

        if (!config || !status) {
          return Promise.reject(handleError(error));
        }

        let retryCount = 0;
        // Get current retry count from headers
        const rawRetryHeader = (config.headers as any)?.['x-retry-count'];
        if (Boolean(rawRetryHeader)) {
          const parsedRetryCountHeader = parseInt(rawRetryHeader, 10);
          retryCount = isNaN(parsedRetryCountHeader)
            ? 0
            : parsedRetryCountHeader;
        }

        if (
          status &&
          this.retryableStatusCodes.includes(status) &&
          retryCount < this.maxRetries &&
          isMethodRetryable(config.method, this.retryableHttpMethods)
        ) {
          const delay = calculateRetryDelay(
            this.retryDelay,
            retryCount,
            status,
          );
          await sleep(delay);
          // Increment retry count
          config.headers = config.headers || {};
          config.headers['x-retry-count'] = String(retryCount + 1);

          // Retry the request
          return this.httpClient.request(config);
        }

        return Promise.reject(handleError(error));
      },
    );
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.httpClient.get<T>(url, config);
    return response.data;
  }

  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.httpClient.post<T>(url, data, config);
    return response.data;
  }

  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.httpClient.put<T>(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.httpClient.delete<T>(url, config);
    return response.data;
  }

  // ── Gateway API methods (points, etc.) ────────────────────────────────
  async getFromGateway<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.httpGatewayClient.get<T>(url, config);
    return response.data;
  }

  async postToGateway<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.httpGatewayClient.post<T>(url, data, config);
    return response.data;
  }

  async putToGateway<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.httpGatewayClient.put<T>(url, data, config);
    return response.data;
  }

  async deleteFromGateway<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const response = await this.httpGatewayClient.delete<T>(url, config);
    return response.data;
  }
}
