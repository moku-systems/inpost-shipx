import type { ApiPointType } from '../points/point-type';
import type { ApiAddressLine } from '../common/address';
import type { ApiShipmentServiceType } from '../service/shipment-service';
import type { ApiShipmentStatus } from '../status/shipment-status';
import type { ApiTrackingParcelSize } from '../parcel/shipment-parcel-size';

export type ApiTrackingDetail = {
  origin_status: string;
  status: ApiShipmentStatus;
  agency: string | null;
  location: string | null;
  datetime: string;
};

type ApiTargetMachineDetail = {
  name: string;
  opening_hours: string;
  location: { latitude: number; longitude: number };
  location_description: string;
  address: ApiAddressLine;
  type: ApiPointType[];
};

type ApiTrackingCustomAttributes = {
  size: ApiTrackingParcelSize;
  target_machine_id: string;
  target_machine_detail: ApiTargetMachineDetail;
};

export type ApiTrackingResponse = {
  tracking_number: string;
  type: ApiShipmentServiceType;
  service: ApiShipmentServiceType;
  status: ApiShipmentStatus;
  custom_attributes?: ApiTrackingCustomAttributes;
  tracking_details: ApiTrackingDetail[];
  created_at: string;
  updated_at: string;
  expected_flow: ApiShipmentStatus[];
};
