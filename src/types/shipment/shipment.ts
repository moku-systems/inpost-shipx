import type { Receiver, Sender } from './shipment-contact';
import type { Parcel } from './parcel';
import { Currency } from './currency';
import { ShipmentServiceType } from './shipment-service';
import { ShipmentStatus } from '../status';
import { ShipmentOfferStatus } from '../status/offer-status';
import { ShipmentTransactionStatus } from '../status/shipment-transaction-status';

export type Insurance = {
  amount: number;
  currency: Currency;
};

export type CashOnDelivery = {
  amount: number;
  currency: Currency;
};

export type CreateShipmentInput = {
  receiver: Receiver;
  sender?: Sender;
  parcels: Parcel[];
  insurance?: Insurance;
  cod?: CashOnDelivery;
  service: ShipmentServiceType;
  reference?: string;
  comments?: string;
  externalCustomerId?: string;
  customAttributes?: Record<string, string>;
  endOfWeekCollection?: boolean;
  saturdayDelivery?: boolean;
  onlyChoiceOfOffer?: boolean;
};

export type ShipmentOffer = {
  id: string;
  carrier: { id: string; name: string };
  service: ShipmentServiceType;
  status: ShipmentOfferStatus;
  expiresAt: string;
  rate: number | null;
  currency: Currency;
};

export type ShipmentTransaction = {
  id: number;
  status: ShipmentTransactionStatus;
  createdAt: string;
  updatedAt: string;
  offerId: number;
  details: {
    status: number;
    error: string;
    message: string;
    details: Record<string, string | number | boolean | null>;
  } | null;
};

export type Shipment = {
  id: number;
  status: ShipmentStatus;
  trackingNumber: string | null;
  service: ShipmentServiceType;
  reference: string | null;
  comments: string | null;
  createdAt: string;
  updatedAt: string;
  receiver: Receiver;
  sender: Sender;
  parcels: (Parcel & { id: string; trackingNumber: string | null })[];
  insurance: Insurance | null;
  cod: CashOnDelivery | null;
  offers: ShipmentOffer[];
  selectedOffer: ShipmentOffer | null;
  transactions: ShipmentTransaction[] | null;
  customAttributes: Record<string, string> | null;
  externalCustomerId: string | null;
};

export type ShipmentListResult = {
  items: Shipment[];
  count: number;
  page: number;
  perPage: number;
  totalPages: number;
};

export type GetShipmentListInput = {
  page?: number;
  perPage?: number;
  sortBy?: 'created_at' | 'updated_at';
  sortOrder?: 'asc' | 'desc';
  status?: ShipmentStatus;
  service?: ShipmentServiceType;
  trackingNumber?: string;
};

export type BuyShipmentOfferInput = {
  offerId: number;
};
