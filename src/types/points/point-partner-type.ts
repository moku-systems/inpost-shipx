export const PointPartnerType = {
  PARCEL_LOCKER: 'PARCEL_LOCKER',
  SUPER_POP: 'SUPER_POP',
  POP: 'POP',
} as const;

export type PointPartnerType =
  (typeof PointPartnerType)[keyof typeof PointPartnerType];
