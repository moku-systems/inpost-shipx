export const ShipmentOfferStatus = {
  IN_PREPARATION: 'in_preparation',
  AVAILABLE: 'available',
  UNAVAILABLE: 'unavailable',
  SELECTED: 'selected',
  BOUGHT: 'bought',
  EXPIRED: 'expired',
} as const;

export type ShipmentOfferStatus =
  (typeof ShipmentOfferStatus)[keyof typeof ShipmentOfferStatus];
