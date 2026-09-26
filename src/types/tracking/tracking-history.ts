import type { ShipmentServiceType } from '../service';
import { ShipmentStatus } from '../status';
import type { ParcelSize } from '../parcel';
import type { PointType } from '../points';
import {
  AddressGeoLocation,
  AddressLine,
  AddressLocationDescription,
} from '../common';

type ParcelDetails = {
  parcelSize?: ParcelSize;
  lockerDetails?: LockerDetails;
};

type LockerDetails = {
  name?: string;
  locationDescription?: AddressLocationDescription;
  geoLocation?: AddressGeoLocation;
  addressLine?: AddressLine;
  type?: PointType;
};

export type TrackingEvent = {
  status: ShipmentStatus;
  timestamp: string;
};

export type TrackingHistory = {
  trackingNumber: string;
  service: ShipmentServiceType;
  currentStatus: ShipmentStatus;
  parcelDetails?: ParcelDetails;
  trackingEvents: TrackingEvent[];
};
