import type {
  CreateShipmentInput,
  Shipment,
  ShipmentOffer,
  ShipmentListResult,
  BuyShipmentOfferInput,
  GetShipmentListInput,
  Address,
  Receiver,
  Sender,
  Parcel,
  Currency,
  CountryCode,
} from '../types/shipment';

import type {
  ApiCreateShipmentRequest,
  ApiAddress,
  ApiReceiver,
  ApiSender,
  ApiParcel,
  ApiBuyShipmentOfferRequest,
} from '../types/api/shipment/create-shipment-request';
import type {
  ApiShipmentResponse,
  ApiShipmentOffer,
  ApiShipmentListResponse,
} from '../types/api/shipment/create-shipment-response';
import {
  mapCurrencyFromApi,
  mapServiceFromApi,
  mapServiceToApi,
  mapStatusFromApi,
  mapStatusToApi,
} from './common';

// ═══════════════════════════════════════════════════════════════
//  INPUT  →  API REQUEST
// ═══════════════════════════════════════════════════════════════

function mapAddressToApi(address: Address): ApiAddress {
  return {
    street: address.streetName,
    building_number: address.streetNumber,
    city: address.city,
    post_code: address.postalCode,
    country_code: address.countryCode,
  };
}

function mapReceiverToApi(receiver: Receiver): ApiReceiver {
  return {
    name: receiver.name,
    company_name: receiver.companyName,
    first_name: receiver.firstName,
    last_name: receiver.lastName,
    email: receiver.email,
    phone: receiver.phone,
    address: receiver.address ? mapAddressToApi(receiver.address) : undefined,
  };
}

function mapSenderToApi(sender: Sender): ApiSender {
  return {
    name: sender.name,
    company_name: sender.companyName,
    first_name: sender.firstName,
    last_name: sender.lastName,
    email: sender.email,
    phone: sender.phone,
    address: sender.address ? mapAddressToApi(sender.address) : undefined,
  };
}

function mapParcelToApi(parcel: Parcel): ApiParcel {
  return {
    id: parcel.id,
    template: parcel.template,
    dimensions: parcel.dimensions,
    weight: parcel.weight,
    is_non_standard: parcel.isNonStandard,
  };
}

export function mapCreateShipmentToApi(
  input: CreateShipmentInput,
): ApiCreateShipmentRequest {
  return {
    receiver: mapReceiverToApi(input.receiver),
    sender: input.sender ? mapSenderToApi(input.sender) : undefined,
    parcels: input.parcels.map(mapParcelToApi),
    insurance: input.insurance,
    cod: input.cod,
    service: mapServiceToApi(input.service),
    reference: input.reference,
    comments: input.comments,
    external_customer_id: input.externalCustomerId,
    custom_attributes: input.customAttributes,
    end_of_week_collection: input.endOfWeekCollection,
    saturday_delivery: input.saturdayDelivery,
    only_choice_of_offer: input.onlyChoiceOfOffer,
  };
}

export function mapBuyOfferToApi(
  input: BuyShipmentOfferInput,
): ApiBuyShipmentOfferRequest {
  return { offer_id: input.offerId };
}

export function mapListParamsToApi(
  input: GetShipmentListInput,
): Record<string, string | number | undefined> {
  return {
    page: input.page,
    per_page: input.perPage,
    sort_by: input.sortBy,
    sort_order: input.sortOrder,
    status: input.status ? mapStatusToApi(input.status) : undefined,
    service: input.service ? mapServiceToApi(input.service) : undefined,
    tracking_number: input.trackingNumber,
  };
}

// ═══════════════════════════════════════════════════════════════
//  API RESPONSE  →  OUTPUT
// ═══════════════════════════════════════════════════════════════

function mapAddressFromApi(
  api:
    | ApiAddress
    | {
        street: string;
        building_number: string;
        city: string;
        post_code: string;
        country_code?: string;
      },
): Address {
  return {
    streetName: api.street,
    streetNumber: api.building_number,
    city: api.city,
    postalCode: api.post_code,
    countryCode: api.country_code as CountryCode,
  };
}

function mapReceiverFromApi(api: ApiShipmentResponse['receiver']): Receiver {
  return {
    name: api.name,
    companyName: api.company_name,
    firstName: api.first_name,
    lastName: api.last_name,
    email: api.email,
    phone: api.phone,
    address: api.address ? mapAddressFromApi(api.address) : undefined,
  };
}

function mapSenderFromApi(api: ApiShipmentResponse['sender']): Sender {
  return {
    name: api.name,
    companyName: api.company_name,
    firstName: api.first_name,
    lastName: api.last_name,
    email: api.email,
    phone: api.phone,
    address: api.address ? mapAddressFromApi(api.address) : undefined,
  };
}

function mapOfferFromApi(api: ApiShipmentOffer): ShipmentOffer {
  return {
    id: api.id,
    carrier: api.carrier,
    service: mapServiceFromApi(api.service),
    status: mapStatusFromApi(api.status),
    expiresAt: api.expires_at,
    rate: api.rate,
    currency: mapCurrencyFromApi(api.currency),
  };
}

export function mapShipmentFromApi(api: ApiShipmentResponse): Shipment {
  return {
    id: api.id,
    status: mapStatusFromApi(api.status),
    trackingNumber: api.tracking_number,
    service: mapServiceFromApi(api.service),
    reference: api.reference,
    comments: api.comments,
    createdAt: api.created_at,
    updatedAt: api.updated_at,
    receiver: mapReceiverFromApi(api.receiver),
    sender: mapSenderFromApi(api.sender),
    parcels: api.parcels.map(p => ({
      id: p.id,
      template: p.template as Parcel['template'],
      dimensions: p.dimensions,
      isNonStandard: p.is_non_standard,
      trackingNumber: p.tracking_number,
    })),
    insurance: api.insurance
      ? {
          amount: api.insurance.amount,
          currency: api.insurance.currency as Currency,
        }
      : null,
    cod: api.cod
      ? {
          amount: api.cod.amount,
          currency: api.cod.currency as Currency,
        }
      : null,
    offers: api.offers.map(o => ({
      ...mapOfferFromApi(o),
      service: mapServiceFromApi(o.service),
    })),
    selectedOffer: api.selected_offer
      ? mapOfferFromApi(api.selected_offer)
      : null,
    customAttributes: api.custom_attributes,
    externalCustomerId: api.external_customer_id,
  };
}

export function mapShipmentListFromApi(
  api: ApiShipmentListResponse,
): ShipmentListResult {
  return {
    items: api.items.map(mapShipmentFromApi),
    count: api.count,
    page: api.page,
    perPage: api.per_page,
    totalPages: api.total_pages,
  };
}
