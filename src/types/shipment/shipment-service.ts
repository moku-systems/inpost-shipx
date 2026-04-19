export const ShipmentServiceType = {
  LockerStandard: 'LOCKER_STANDARD',
  LockerPassThru: 'LOCKER_PASS_THRU',
  LockerEconomy: 'LOCKER_ECONOMY',
  LockerC2C: 'LOCKER_C2C',

  CourierStandard: 'COURIER_STANDARD',
  CourierExpress1000: 'COURIER_EXPRESS_1000',
  CourierExpress1200: 'COURIER_EXPRESS_1200',
  CourierExpress1700: 'COURIER_EXPRESS_1700',
  CourierPallet: 'COURIER_PALLET',
  CourierC2C: 'COURIER_C2C',
} as const;

export type ShipmentServiceType =
  (typeof ShipmentServiceType)[keyof typeof ShipmentServiceType];
