/**
 * InPost API hosts configuration
 *
 * @see https://dokumentacja-inpost.atlassian.net/wiki/spaces/PL/pages/18153476/API+ShipX+ENG+Documentation
 */

export const INPOST_HOSTS = {
  sandbox: 'https://sandbox-api-shipx-pl.easypack24.net',
  production: 'https://api-shipx-pl.easypack24.net',
} as const;

export const BASE_PATH = '/v1';

export type InPostEnvironment = keyof typeof INPOST_HOSTS;

/**
 * Get host from environment or use default
 * Allows override via environment variables for testing
 */
export function getHost(environment: InPostEnvironment): string {
  if (environment === 'sandbox' && process.env.INPOST_HOST) {
    return process.env.INPOST_HOST;
  }
  if (environment === 'production' && process.env.INPOST_HOST) {
    return process.env.INPOST_HOST;
  }

  return INPOST_HOSTS[environment];
}

/**
 * Build full URL for InPost ShipX API
 *
 * @example
 * ```typescript
 * buildUrl('sandbox', '/points')
 * // Returns: 'https://sandbox-api-shipx-pl.easypack24.net/v1/points'
 * ```
 */
export function buildUrl(
  environment: InPostEnvironment,
  endpoint: string,
): string {
  const host = getHost(environment);
  return `${host}${BASE_PATH}${endpoint}`;
}
