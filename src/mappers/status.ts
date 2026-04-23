import { ApiShipmentStatus } from '../types/api/status/shipment-status';
import { ShipmentStatus } from '../types/shipment';

export const STATUS_TO_API = new Map<ShipmentStatus, ApiShipmentStatus>([
  [ShipmentStatus.PARCEL_CREATED, 'created'],
  [ShipmentStatus.OFFERS_PREPARED, 'offers_prepared'],
  [ShipmentStatus.OFFER_SELECTED, 'offer_selected'],
  [ShipmentStatus.PREPARED_TO_SEND, 'confirmed'],
  [ShipmentStatus.DISPATCHED_BY_SENDER, 'dispatched_by_sender'],
  [ShipmentStatus.DISPATCHED_BY_SENDER, 'dispatched_by_sender_to_pok'],
  [ShipmentStatus.COLLECTED_BY_COURIER, 'collected_from_sender'],
  [ShipmentStatus.COLLECTED_BY_COURIER, 'taken_by_courier_from_pok'],
  [ShipmentStatus.COLLECTED_BY_COURIER, 'taken_by_courier'],
  [ShipmentStatus.ON_THE_WAY, 'adopted_at_source_branch'],
  [ShipmentStatus.ON_THE_WAY, 'sent_from_source_branch'],
  [ShipmentStatus.ON_THE_WAY, 'adopted_at_sorting_center'],
  [ShipmentStatus.ON_THE_WAY, 'sent_from_sorting_center'],
  [ShipmentStatus.ON_THE_WAY, 'adopted_at_target_branch'],
  [ShipmentStatus.ON_THE_WAY, 'delay_in_delivery'],
  [ShipmentStatus.READY_TO_PICKUP, 'ready_to_pickup'],
  [ShipmentStatus.READY_TO_PICKUP, 'ready_to_pickup_from_pok'],
  [ShipmentStatus.OUT_FOR_DELIVERY, 'out_for_delivery'],
  [ShipmentStatus.OUT_FOR_DELIVERY, 'out_for_delivery_to_address'],
  [ShipmentStatus.DELIVERED, 'delivered'],
  [ShipmentStatus.RETURNED_TO_SENDER, 'returned_to_sender'],
  [ShipmentStatus.MISSED_COURIER, 'avizo'],
  [ShipmentStatus.MISSED_COURIER, 'undelivered_wrong_address'],
  [ShipmentStatus.MISSED_COURIER, 'undelivered_incomplete_address'],
  [ShipmentStatus.MISSED_COURIER, 'undelivered_unknown_receiver'],
  [ShipmentStatus.MISSED_COURIER, 'rejected_by_receiver'],
  [ShipmentStatus.CLAIMED, 'claimed'],
  [ShipmentStatus.CANCELLED, 'cancelled'],
]);

export const API_TO_STATUS = new Map<ApiShipmentStatus, ShipmentStatus>(
  [...STATUS_TO_API.entries()].map(([k, v]) => [v, k]),
);
