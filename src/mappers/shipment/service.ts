// ═══════════════════════════════════════════════════════════════
//  SDK  →  API
// ═══════════════════════════════════════════════════════════════

import { ApiShipmentService } from '../../types/api/shipment/shipment-service';
import { ShipmentServiceType } from '../../types/shipment';
import { mapOrThrow } from './common';

export const SERVICE_TO_API = new Map<ShipmentServiceType, ApiShipmentService>([
  [ShipmentServiceType.LOCKER_STANDARD, 'inpost_locker_standard'],
  [ShipmentServiceType.LOCKER_PASS_THRU, 'inpost_locker_pass_thru'],
  [ShipmentServiceType.LOCKER_ECONOMY, 'inpost_locker_economy'],
  [ShipmentServiceType.LOCKER_C2C, 'inpost_locker_c2c'],
  [ShipmentServiceType.COURIER_STANDARD, 'inpost_courier_standard'],
  [ShipmentServiceType.COURIER_EXPRESS_1000, 'inpost_courier_express_1000'],
  [ShipmentServiceType.COURIER_EXPRESS_1200, 'inpost_courier_express_1200'],
  [ShipmentServiceType.COURIER_EXPRESS_1700, 'inpost_courier_express_1700'],
  [ShipmentServiceType.COURIER_PALLET, 'inpost_courier_palette'],
  [ShipmentServiceType.COURIER_C2C, 'inpost_courier_c2c'],
]);

export const API_TO_SERVICE = new Map<ApiShipmentService, ShipmentServiceType>(
  [...SERVICE_TO_API.entries()].map(([k, v]) => [v, k]),
);

export function mapServiceToApi(
  serviceType: ShipmentServiceType,
): ApiShipmentService {
  return mapOrThrow(SERVICE_TO_API, serviceType, 'ShipmentServiceType');
}
export function mapServiceFromApi(
  apiService: ApiShipmentService,
): ShipmentServiceType {
  return mapOrThrow(API_TO_SERVICE, apiService, 'ApiShipmentService');
}
