/**
 * Kontrakt API InPost — response body
 * @internal
 */

import { ApiShipmentStatus } from '../status/shipment-status';
import { ApiCurrency } from './shipment-currency';
import { ApiShipmentService } from './shipment-service';

export type ApiShipmentOffer = {
  id: string;
  carrier: { id: string; name: string };
  service: ApiShipmentService;
  status: ApiShipmentStatus;
  expires_at: string;
  rate: number;
  currency: ApiCurrency;
};

export type ApiShipmentResponse = {
  id: number;
  status: ApiShipmentStatus;
  tracking_number: string | null;
  service: ApiShipmentService;
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
