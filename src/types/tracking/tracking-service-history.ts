import { ShipmentServiceType } from '../service';

export type TrackingServiceHistory = {
  shipmentId: string;
  lastService: ShipmentServiceType;
  updatedAt: string;
};
