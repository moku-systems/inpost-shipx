import { ApiShipmentStatus } from '../types/api/status/shipment-status';
import { ShipmentStatus } from '../types/status';
import { mapOrThrow } from './common';

export const STATUS_TO_API = new Map<ShipmentStatus, ApiShipmentStatus>([
  [ShipmentStatus.CREATED, 'created'],
  [ShipmentStatus.OFFERS_PREPARED, 'offers_prepared'],
  [ShipmentStatus.OFFER_SELECTED, 'offer_selected'],
  [ShipmentStatus.CONFIRMED, 'confirmed'],
  [ShipmentStatus.DISPATCHED_BY_SENDER, 'dispatched_by_sender'],
  [ShipmentStatus.DISPATCHED_BY_SENDER_TO_POK, 'dispatched_by_sender_to_pok'],
  [ShipmentStatus.COLLECTED_FROM_SENDER, 'collected_from_sender'],
  [ShipmentStatus.TAKEN_BY_COURIER, 'taken_by_courier'],
  [ShipmentStatus.ADOPTED_AT_SOURCE_BRANCH, 'adopted_at_source_branch'],
  [ShipmentStatus.SENT_FROM_SOURCE_BRANCH, 'sent_from_source_branch'],
  [ShipmentStatus.ADOPTED_AT_SORTING_CENTER, 'adopted_at_sorting_center'],
  [ShipmentStatus.SENT_FROM_SORTING_CENTER, 'sent_from_sorting_center'],
  [ShipmentStatus.ADOPTED_AT_TARGET_BRANCH, 'adopted_at_target_branch'],
  [ShipmentStatus.READY_TO_PICKUP, 'ready_to_pickup'],
  [ShipmentStatus.OUT_FOR_DELIVERY, 'out_for_delivery'],
  [ShipmentStatus.DELIVERED, 'delivered'],
  [ShipmentStatus.RETURNED_TO_SENDER, 'returned_to_sender'],
  [ShipmentStatus.AVIZO, 'avizo'],
  [ShipmentStatus.CLAIMED, 'claimed'],
  [ShipmentStatus.CANCELLED, 'cancelled'],
]);

export const API_TO_STATUS = new Map<ApiShipmentStatus, ShipmentStatus>(
  [...STATUS_TO_API.entries()].map(([k, v]) => [v, k]),
);

export function mapStatusToApi(status: ShipmentStatus): ApiShipmentStatus {
  return mapOrThrow(STATUS_TO_API, status, 'ShipmentStatus');
}
export function mapStatusFromApi(apiStatus: ApiShipmentStatus): ShipmentStatus {
  return mapOrThrow(API_TO_STATUS, apiStatus, 'ApiShipmentStatus');
}
