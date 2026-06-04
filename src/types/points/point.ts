import type { PointFunctionType } from './point-function';
import type { Address } from '../common/address';
import type { PointPartnerType } from './point-partner-type';
import type { PointType } from './point-type';
import type { PointStatus } from './point-status';
import type { PaginatedResponse } from '../common/pagination';

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
  status: PointStatus;
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

export type GetPointListInput = {
  // Basic filters
  name?: string | string[];
  type?: PointType | PointType[];
  functions?: PointFunctionType | PointFunctionType[];
  partnerId?: PointPartnerType | PointPartnerType[];
  isNext?: boolean;
  paymentAvailable?: boolean;

  // Address filters
  postCode?: string | string[];
  city?: string | string[];
  province?: string | string[];

  // Technical filters
  virtual?: number | number[];
  updatedFrom?: string;
  updatedTo?: string;

  // Availability
  location247?: boolean;
  supportedLockerTemperatures?: number | number[];

  // Location filters
  relativePoint?: string;
  relativePostCode?: string;
  maxDistance?: number;
  limit?: number;

  // Sorting
  sortBy?: 'name' | 'distance_to_relative_point' | 'status';
  sortOrder?: 'asc' | 'desc';

  // Pagination
  page?: number;
  perPage?: number;

  // Field selection
  fields?: string;
};

export type PointListResult = PaginatedResponse<PointResponse>;
