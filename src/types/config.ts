export type ShipXConfig = {
  /*
   * Offline access token for ShipX API
   * ShipX uses offline tokens that don't expire, so we only need to provide the token once.
   * @see https://dokumentacja-inpost.atlassian.net/wiki/spaces/PL/pages/622754/API+ShipX
   */
  accessToken: string; // Offline access token for ShipX API
  /*
   * Organization ID for multi-tenant accounts. If your account has access to multiple organizations, you can specify which one to use for API requests.
   */
  organizationId: string; // Organization ID for multi-tenant accounts
  /**
   * API environment to use (sandbox or production). Defaults to 'sandbox'.
   * Use 'sandbox' for testing with ShipX's sandbox environment.
   * @default 'sandbox'
   */
  environment: 'sandbox' | 'production'; // API environment
  /**
   * Request timeout in milliseconds. Defaults to 30000 (30 seconds).
   * @default 30000
   */
  timeout?: number; // Request timeout in milliseconds (default: 30000)
  /**
   * Retry configuration for failed requests. You can specify the maximum number of retries, delay between retries, and which HTTP status codes and methods should trigger a retry.
   * @default 3
   */
  maxRetries?: number; // Maximum number of retries for failed requests (default: 3)
  /**
   * Delay between retries in milliseconds. Defaults to 1000 (1 second).
   * @default 1000
   */
  retryDelay?: number; // Delay between retries in milliseconds (default: 1000)
  /**
   * Optional array of HTTP status codes that should trigger a retry. Defaults to [429, 500, 502, 503, 504] (common transient error codes).
   * @default [429, 500, 502, 503, 504]
   */
  retryableStatusCodes?: readonly number[]; // HTTP status codes that should trigger a retry
  /**
   * Optional array of HTTP methods that are safe to retry. Defaults to ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS'] (idempotent methods).
   * @default ['GET', 'HEAD', 'PUT', 'DELETE', 'OPTIONS']
   */
  retryableHttpMethods?: readonly string[]; // HTTP methods safe to retry (default: GET, HEAD, PUT, DELETE, OPTIONS)
};
