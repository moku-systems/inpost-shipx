/**
 * API InPost — response body
 * @internal
 */
import { ApiPointFunction } from './point-function';
import { PointStatus } from './point-status';
import { ApiPointType } from './point-type';

type OperatingHours = {
  start: number;
  end: number;
};

export type ApiPointResponse = {
  name: string;
  type: ApiPointType[];
  status: PointStatus;
  location: {
    longitude: number;
    latitude: number;
  };
  location_type: string | null;
  location_description: string | null;
  location_description_1: string | null;
  location_description_2: string | null;
  distance: number | null;
  opening_hours: string | null;
  address: {
    line1: string;
    line2: string;
  };
  address_details: {
    city: string;
    province: string;
    post_code: string;
    street: string;
    building_number: string;
    flat_number: string | null;
  };
  phone_number: string | null;
  payment_point_descr: string | null;
  functions: ApiPointFunction[];
  partner_id: number;
  is_next: boolean;
  payment_available: boolean;
  payment_type: Record<string, string>;
  virtual: string;
  recommended_low_interest_box_machines_list: string[] | null;
  location_247: boolean;
  easy_access_zone: boolean;
  physical_type_mapped: string | null;
  physical_type_description: string | null;
  supported_locker_temperatures: string[] | null;
  operating_hours_extended: {
    customer: Record<string, OperatingHours[]> | null;
  } | null;
  image_url: string | null;
};
