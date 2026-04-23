export const ShipmentLabelFormat = {
  PDF: 'PDF',
  ZPL: 'ZPL',
  EPL: 'EPL',
} as const;

export type ShipmentLabelFormat =
  (typeof ShipmentLabelFormat)[keyof typeof ShipmentLabelFormat];
