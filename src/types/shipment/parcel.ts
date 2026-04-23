export const ParcelSize = {
  SMALL: 'SMALL',
  MEDIUM: 'MEDIUM',
  LARGE: 'LARGE',
} as const;

export type ParcelSize = (typeof ParcelSize)[keyof typeof ParcelSize];

export type ParcelDimensions = {
  length: number;
  width: number;
  height: number;
  weight: number;
};

export type Parcel = {
  id?: string;
  template?: ParcelSize;
  dimensions?: ParcelDimensions;
  weight?: {
    amount: number;
    unit?: string;
  };
  isNonStandard?: boolean;
};
