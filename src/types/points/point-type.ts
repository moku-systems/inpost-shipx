export const PointType = {
  PARCEL_LOCKER: 'PARCEL_LOCKER',
  POP: 'POP',
  PARCEL_LOCKER_ONLY: 'PARCEL_LOCKER_ONLY',
  PARCEL_LOCKER_SUPERPOP: 'PARCEL_LOCKER_SUPERPOP',
} as const;

export type PointType = (typeof PointType)[keyof typeof PointType];
