import { PointService, ShipmentService } from './services';
import { InPostClient } from './client';
import { AuthManager } from './auth';
import type { ShipXConfig } from './types/config';

/**
 * InPost ShipX SDK facade to all InPost ShipX services.
 *
 * @example
 * ```typescript
 * const inpost = new InPostShipX({
 *   accessToken: 'my-access-token',
 *   organizationId: 'org-123',
 *   environment: 'sandbox',
 * });
 *
 * const shipment = await inpost.shipments.create({
 *   service: 'LOCKER_STANDARD',
 *   parcels: [{ template: 'MEDIUM' }],
 *   receiver: { email: 'john@example.com', phone: '123456789' },
 * });
 *
 * const points = await inpost.points.list({ city: 'Gdańsk' });
 * ```
 */
export class InPostShipX {
  public readonly shipments: ShipmentService;
  public readonly points: PointService;

  constructor(config: ShipXConfig) {
    const client = new InPostClient(config);
    const authManager = new AuthManager(config);
    this.shipments = new ShipmentService(
      client,
      authManager.getOrganizationId(),
    );
    this.points = new PointService(client);
  }
}
