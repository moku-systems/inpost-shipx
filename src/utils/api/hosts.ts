/**
 * InPost API hosts configuration
 *
 * @see https://dokumentacja-inpost.atlassian.net/wiki/spaces/PL/pages/18153476/API+ShipX+ENG+Documentation
 */

export const INPOST_HOSTS = {
  sandbox: 'https://sandbox-api-shipx-pl.easypack24.net',
  production: 'https://api-shipx-pl.easypack24.net',
} as const;

export const INPOST_HOSTS_GATEWAY = {
  sandbox: 'https://sandbox-api-gateway-pl.easypack24.net',
  production: 'https://api.inpost.pl',
} as const;

export const BASE_PATH = '/v1';

export type InPostEnvironment = keyof typeof INPOST_HOSTS;

/**
 * Get ShipX host from environment (supports INPOST_HOST override for testing)
 */
export function getHost(environment: InPostEnvironment): string {
  if (process.env.INPOST_HOST) {
    return process.env.INPOST_HOST;
  }
  return INPOST_HOSTS[environment];
}

/**
 * Get Gateway host from environment (supports INPOST_GATEWAY_HOST override for testing)
 */
export function getGatewayHost(environment: InPostEnvironment): string {
  if (process.env.INPOST_GATEWAY_HOST) {
    return process.env.INPOST_GATEWAY_HOST;
  }
  return INPOST_HOSTS_GATEWAY[environment];
}

/**
 * Build full URL for InPost ShipX API
 *
 * @example
 * ```typescript
 * buildUrl('sandbox', '/shipments/123/label');
 * // Returns: 'https://sandbox-api-shipx-pl.easypack24.net/v1/shipments/123/label'
 *
 * buildUrl('production', '/shipments/123/label');
 * // Returns: 'https://api-shipx-pl.easypack24.net/v1/shipments/123/label'
 * ```
 */
export function buildUrl(
  environment: InPostEnvironment,
  endpoint: string,
): string {
  const host = getHost(environment);
  return `${host}${BASE_PATH}${endpoint}`;
}

/**
 * Build full URL for InPost Gateway API (points, etc.)
 *
 * @example
 * buildGatewayUrl('sandbox', '/points')
 * // Returns: 'https://sandbox-api-gateway-pl.easypack24.net/v1/points'
 *
 * buildGatewayUrl('production', '/points')
 * // Returns: 'https://api.inpost.pl/v1/points'
 */
export function buildGatewayUrl(
  environment: InPostEnvironment,
  endpoint: string,
): string {
  const host = getGatewayHost(environment);
  return `${host}${BASE_PATH}${endpoint}`;
}
