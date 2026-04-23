/**
 * Kontrakt API InPost — request body
 * Odzwierciedla dokładnie strukturę JSON akceptowaną przez API
 * @internal — nie eksportowane do konsumentów SDK
 */

export type ApiAddress = {
  street: string;
  building_number: string;
  city: string;
  post_code: string;
  country_code?: string;
};

export type ApiReceiver = {
  name?: string;
  company_name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone: string;
  address?: ApiAddress;
};

export type ApiSender = {
  name?: string;
  company_name?: string;
  first_name?: string;
  last_name?: string;
  email: string;
  phone: string;
  address?: ApiAddress;
};

export type ApiParcelDimensions = {
  length: number;
  width: number;
  height: number;
  weight: number;
};

export type ApiParcel = {
  id?: string;
  template?: string;
  dimensions?: ApiParcelDimensions;
  weight?: { amount: number; unit?: string };
  is_non_standard?: boolean;
};

export type ApiCreateShipmentRequest = {
  receiver: ApiReceiver;
  sender?: ApiSender;
  parcels: ApiParcel[];
  insurance?: { amount: number; currency: string };
  cod?: { amount: number; currency: string };
  service: string;
  reference?: string;
  comments?: string;
  external_customer_id?: string;
  custom_attributes?: Record<string, string>;
  end_of_week_collection?: boolean;
  saturday_delivery?: boolean;
  only_choice_of_offer?: boolean;
};

export type ApiBuyShipmentOfferRequest = {
  offer_id: number;
};
