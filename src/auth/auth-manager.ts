import type { ShipXConfig } from '../types/config';
import { InPostConfigError } from '../utils/errors';

/**
 * Authentication manager for ShipX API
 * ShipX uses offline access tokens that don't expire
 *
 * @see https://dokumentacja-inpost.atlassian.net/wiki/spaces/PL/pages/622754/API+ShipX
 */
export class AuthManager {
  private readonly accessToken: string;
  private readonly organizationId: string;

  constructor(config: ShipXConfig) {
    if (!config.accessToken || config.accessToken.trim().length === 0) {
      throw new InPostConfigError('accessToken is required for ShipX API');
    }
    if (!config.organizationId || config.organizationId.trim().length === 0) {
      throw new InPostConfigError('organizationId is required for ShipX API');
    }
    this.accessToken = config.accessToken;
    this.organizationId = config.organizationId;
  }

  /**
   * Get the offline access token
   * @returns The access token
   */
  async getAccessToken(): Promise<string> {
    return this.accessToken;
  }

  /**
   * Get the organization ID
   * @returns The organization ID
   */
  getOrganizationId(): string {
    return this.organizationId;
  }
}
