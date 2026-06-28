export const ShipmentTransactionStatus = {
  INITIATED: 'initiated',
  SUCCESS: 'success',
  FAILURE: 'failure',
} as const;

export type ShipmentTransactionStatus =
  (typeof ShipmentTransactionStatus)[keyof typeof ShipmentTransactionStatus];
