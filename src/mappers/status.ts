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
  [ShipmentStatus.TAKEN_BY_COURIER_FROM_POK, 'taken_by_courier_from_pok'],
  [
    ShipmentStatus.TAKEN_BY_COURIER_FROM_CUSTOMER_SERVICE_POINT,
    'taken_by_courier_from_customer_service_point',
  ],
  [ShipmentStatus.ADOPTED_AT_SOURCE_BRANCH, 'adopted_at_source_branch'],
  [ShipmentStatus.SENT_FROM_SOURCE_BRANCH, 'sent_from_source_branch'],
  [ShipmentStatus.ADOPTED_AT_SORTING_CENTER, 'adopted_at_sorting_center'],
  [ShipmentStatus.SENT_FROM_SORTING_CENTER, 'sent_from_sorting_center'],
  [ShipmentStatus.ADOPTED_AT_TARGET_BRANCH, 'adopted_at_target_branch'],
  [ShipmentStatus.DELAY_IN_DELIVERY, 'delay_in_delivery'],
  [ShipmentStatus.READY_TO_PICKUP, 'ready_to_pickup'],
  [ShipmentStatus.READY_TO_PICKUP_FROM_POK, 'ready_to_pickup_from_pok'],
  [
    ShipmentStatus.READY_TO_PICKUP_FROM_POK_REGISTERED,
    'ready_to_pickup_from_pok_registered',
  ],
  [ShipmentStatus.READY_TO_PICKUP_FROM_BRANCH, 'ready_to_pickup_from_branch'],
  [ShipmentStatus.PICKUP_REMINDER_SENT, 'pickup_reminder_sent'],
  [ShipmentStatus.PICKUP_REMINDER_SENT_ADDRESS, 'pickup_reminder_sent_address'],
  [ShipmentStatus.PICKUP_TIME_EXPIRED, 'pickup_time_expired'],
  [ShipmentStatus.OUT_FOR_DELIVERY, 'out_for_delivery'],
  [ShipmentStatus.OUT_FOR_DELIVERY_TO_ADDRESS, 'out_for_delivery_to_address'],
  [ShipmentStatus.DELIVERED, 'delivered'],
  [ShipmentStatus.RETURNED_TO_SENDER, 'returned_to_sender'],
  [ShipmentStatus.AVIZO, 'avizo'],
  [ShipmentStatus.CLAIMED, 'claimed'],
  [ShipmentStatus.CANCELED, 'canceled'],
  [ShipmentStatus.REJECTED_BY_RECEIVER, 'rejected_by_receiver'],
  [ShipmentStatus.OVERSIZED, 'oversized'],
  [ShipmentStatus.OTHER, 'other'],
  [ShipmentStatus.UNDELIVERED, 'undelivered'],
  [ShipmentStatus.UNDELIVERED_WRONG_ADDRESS, 'undelivered_wrong_address'],
  [
    ShipmentStatus.UNDELIVERED_INCOMPLETE_ADDRESS,
    'undelivered_incomplete_address',
  ],
  [ShipmentStatus.UNDELIVERED_UNKNOWN_RECEIVER, 'undelivered_unknown_receiver'],
  [
    ShipmentStatus.UNDELIVERED_COD_CASH_RECEIVER,
    'undelivered_cod_cash_receiver',
  ],
  [ShipmentStatus.UNDELIVERED_NO_MAILBOX, 'undelivered_no_mailbox'],
  [ShipmentStatus.UNDELIVERED_NOT_LIVE_ADDRESS, 'undelivered_not_live_address'],
  [
    ShipmentStatus.UNDELIVERED_LACK_OF_ACCESS_LETTERBOX,
    'undelivered_lack_of_access_letterbox',
  ],
  [
    ShipmentStatus.RETURN_PICKUP_CONFIRMATION_TO_SENDER,
    'return_pickup_confirmation_to_sender',
  ],
  [ShipmentStatus.REDIRECT_TO_BOX, 'redirect_to_box'],
  [ShipmentStatus.CANCELED_REDIRECT_TO_BOX, 'canceled_redirect_to_box'],
  [ShipmentStatus.READDRESSED, 'readdressed'],
  [ShipmentStatus.MISSING, 'missing'],
  [
    ShipmentStatus.STACK_IN_CUSTOMER_SERVICE_POINT,
    'stack_in_customer_service_point',
  ],
  [
    ShipmentStatus.STACK_PARCEL_PICKUP_TIME_EXPIRED,
    'stack_parcel_pickup_time_expired',
  ],
  [
    ShipmentStatus.UNSTACK_FROM_CUSTOMER_SERVICE_POINT,
    'unstack_from_customer_service_point',
  ],
  [
    ShipmentStatus.COURIER_AVIZO_IN_CUSTOMER_SERVICE_POINT,
    'courier_avizo_in_customer_service_point',
  ],
  [ShipmentStatus.STACK_IN_BOX_MACHINE, 'stack_in_box_machine'],
  [ShipmentStatus.UNSTACK_FROM_BOX_MACHINE, 'unstack_from_box_machine'],
  [
    ShipmentStatus.STACK_PARCEL_IN_BOX_MACHINE_PICKUP_TIME_EXPIRED,
    'stack_parcel_in_box_machine_pickup_time_expired',
  ],
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
