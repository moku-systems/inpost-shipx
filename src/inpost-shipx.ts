import { PointService, ShipmentService, TrackingService } from './services';
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
 * or
 * const shipmentWithLabel = await inpost.shipments.createShipmentWithLabel({
 *   service: 'LOCKER_STANDARD',
 *   parcels: [{ template: 'MEDIUM' }],
 *   receiver: { email: 'john@example.com', phone: '123456789' },
 * });
 *
 * const points = await inpost.points.list({ city: 'Gdańsk' });
 *
 * const tracking = await inpost.tracking.trackingEvents('your-tracking-number');
 * ```
 */
export class InPostShipX {
  public readonly shipments: ShipmentService;
  public readonly points: PointService;
  public readonly tracking: TrackingService;

  constructor(config: ShipXConfig) {
    const client = new InPostClient(config);
    const authManager = new AuthManager(config);
    this.shipments = new ShipmentService(
      client,
      authManager.getOrganizationId(),
      {
        maxStatusChecks: config.maxShipmentStatusChecks,
        statusCheckRetryDelay: config.shipmentStatusCheckRetryDelay,
      },
    );
    this.points = new PointService(client);
    this.tracking = new TrackingService(client);
  }
}
