export const PointStatus = {
  OPERATING: 'OPERATING',
  NON_OPERATING: 'NON_OPERATING',
  DISABLED: 'DISABLED',
} as const;

export type PointStatus = (typeof PointStatus)[keyof typeof PointStatus];
