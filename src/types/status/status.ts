export const ShipmentStatus = {
  PARCEL_CREATED: 'PARCEL_CREATED', //created
  OFFERS_PREPARED: 'OFFERS_PREPARED',
  OFFER_SELECTED: 'OFFER_SELECTED',
  PREPARED_TO_SEND: 'PREPARED_TO_SEND', //confirmed
  DISPATCHED_BY_SENDER: 'DISPATCHED_BY_SENDER', //dispatched_by_sender, dispatched_by_sender_to_pok
  COLLECTED_BY_COURIER: 'COLLECTED_BY_COURIER', //collected_from_sender, taken_by_courier, taken_by_courier_from_pok
  ON_THE_WAY: 'ON_THE_WAY', //adopted_at_source_branch, sent_from_source_branch, adopted_at_sorting_center, sent_from_sorting_center, adopted_at_target_branch, delay_in_delivery
  /**only for pickup points */
  READY_TO_PICKUP: 'READY_TO_PICKUP', //ready_to_pickup, ready_to_pickup_from_pok
  /**only for pickup points */
  PICKUP_REMINDER: 'PICKUP_REMINDER',
  /**only for pickup points */
  PICKUP_TIME_EXPIRED: 'PICKUP_TIME_EXPIRED',
  OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY', //out_for_delivery, out_for_delivery_to_address
  DELIVERED: 'DELIVERED',
  RETURNED_TO_SENDER: 'RETURNED_TO_SENDER',
  MISSED_COURIER: 'MISSED_COURIER', //avizo, undelivered_wrong_address, undelivered_incomplete_address, undelivered_unknown_receiver, rejected_by_receiver
  CLAIMED: 'CLAIMED',
  CANCELLED: 'CANCELLED',
} as const;

export type ShipmentStatus =
  (typeof ShipmentStatus)[keyof typeof ShipmentStatus];
