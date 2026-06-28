/**
 * Kontrakt API InPost — response body
 * @internal
 */

import { ApiShipmentOfferStatus } from '../status/shipment-offer-status';
import { ApiShipmentStatus } from '../status/shipment-status';
import { ApiCurrency } from './shipment-currency';
import { ApiShipmentServiceType } from './shipment-service';
import { ApiShipmentTransactionStatus } from '../status/shipment-transaction-status';

export type ApiShipmentService = {
  id: string;
  name: string;
  description: string;
};

export type ApiShipmentOffer = {
  id: string;
  carrier: { id: string; name: string };
  service: ApiShipmentServiceType;
  status: ApiShipmentOfferStatus;
  expires_at: string;
  rate: number | null;
  currency: ApiCurrency;
};

export type ApiShipmentTransaction = {
  id: number;
  status: ApiShipmentTransactionStatus;
  created_at: string;
  updated_at: string;
  offer_id: number;
  details: {
    status: number;
    error: string;
    message: string;
    details: Record<string, string | number | boolean | null>;
  } | null;
};

export type ApiShipmentResponse = {
  id: number;
  status: ApiShipmentStatus;
  tracking_number: string | null;
  service: ApiShipmentServiceType;
  reference: string | null;
  comments: string | null;
  created_at: string;
  updated_at: string;
  receiver: {
    name?: string;
    company_name?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone: string;
    address?: {
      street: string;
      building_number: string;
      city: string;
      post_code: string;
      country_code?: string;
    };
  };
  sender: {
    name?: string;
    company_name?: string;
    first_name?: string;
    last_name?: string;
    email: string;
    phone: string;
    address?: {
      street: string;
      building_number: string;
      city: string;
      post_code: string;
      country_code?: string;
    };
  };
  parcels: {
    id: string;
    template?: string;
    tracking_number: string | null;
    dimensions?: {
      length: number;
      width: number;
      height: number;
      weight: number;
    };
    is_non_standard?: boolean;
  }[];
  insurance: { amount: number; currency: ApiCurrency } | null;
  cod: { amount: number; currency: ApiCurrency } | null;
  offers: ApiShipmentOffer[];
  selected_offer: ApiShipmentOffer | null;
  transactions: ApiShipmentTransaction[] | null;
  custom_attributes: Record<string, string> | null;
  external_customer_id: string | null;
};

export type ApiShipmentListResponse = {
  items: ApiShipmentResponse[];
  count: number;
  page: number;
  per_page: number;
  total_pages: number;
};
