/**
 * Kontrakt API InPost — response body (tracking)
 * @internal
 */

import type { ApiShipmentStatus } from '../status/shipment-status';

export type ApiTrackingDetail = {
  origin_status: string | null;
  status: ApiShipmentStatus;
  agency: string | null;
  location: string | null;
  datetime: string;
};

export type ApiTrackingResponse = {
  tracking_number: string;
  status: ApiShipmentStatus;
  tracking_details: ApiTrackingDetail[];
};
