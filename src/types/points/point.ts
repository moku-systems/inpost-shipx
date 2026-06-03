import type { PointFunctionType } from './point-function';
import type { Address } from '../common/address';
import type { PointPartnerType } from './point-partner-type';
import type { PointType } from './point-type';

type OperatingHours = {
  day: string;
  hours: Array<{
    start: number;
    end: number;
  }>;
};

export type PointResponse = {
  name: string;
  type: PointType[];
  status: string;
  location: {
    longitude: number;
    latitude: number;
  };
  locationType: string | null;
  locationDescriptions: string[] | null;
  distance: number | null;
  openingHours: string | null;
  address: {
    line1: string;
    line2: string;
  };
  addressDetails: Address;
  phoneNumber: string | null;
  paymentPointDescription: string | null;
  functions: PointFunctionType[];
  partnerId: PointPartnerType;
  nextLockerType: boolean;
  paymentAvailable: boolean;
  paymentType: Record<string, string>;
  virtual: string;
  recommendedLowInterestBoxMachines: string[] | null;
  location247: boolean;
  hasEasyAccessZone: boolean;
  physicalTypeMapped: string | null;
  physicalTypeDescription: string | null;
  supportedLockerTemperatures: string[] | null;
  operatingHoursDetails: OperatingHours[] | null;
  imageUrl: string | null;
};
