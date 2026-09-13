import type { ApiPointType } from '../points/point-type';
import type { ApiShipmentServiceType } from '../shipment/shipment-service';
import type { ApiShipmentStatus } from '../status/shipment-status';

export type ApiTrackingDetail = {
  origin_status: string | null;
  status: ApiShipmentStatus;
  agency: string | null;
  location: string | null;
  datetime: string;
};

export type ApiParcelSize = 'A' | 'B' | 'C';

export type ApiTargetMachineDetail = {
  name: string;
  opening_hours: string | null;
  location_description: string | null;
  address: { line1: string; line2: string } | null;
  type: ApiPointType[];
};

export type ApiTrackingCustomAttributes = {
  size?: ApiParcelSize;
  target_machine_id?: string;
  target_machine_detail?: ApiTargetMachineDetail | null;
} | null;
export type ApiTrackingResponse = {
  tracking_number: string;
  type: ApiShipmentServiceType;
  service: ApiShipmentServiceType;
  status: ApiShipmentStatus;
  custom_attributes: ApiTrackingCustomAttributes;
  tracking_details: ApiTrackingDetail[];
  created_at: string;
  updated_at: string;
  expected_flow: ApiShipmentStatus[];
};
