export const ShipmentLabelFormat = {
  Pdf: 'PDF',
  Zpl: 'ZPL',
  Epl: 'EPL',
} as const;

export type ShipmentLabelFormat =
  (typeof ShipmentLabelFormat)[keyof typeof ShipmentLabelFormat];
