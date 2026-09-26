import type { ApiShipmentServiceType } from '../service/shipment-service';

export type ApiTrackingServiceHistoryResponse = {
  href: string;
  id: string;
  service_history: { last_service: ApiShipmentServiceType; updated_at: string };
};
