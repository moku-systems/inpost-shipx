import { ApiShipmentOfferStatus } from '../../types/api/status/shipment-offer-status';
import { ShipmentOfferStatus } from '../../types/status/offer-status';
import { mapOrThrow } from '../shipment/common';

export const OFFER_STATUS_TO_API = new Map<
  ShipmentOfferStatus,
  ApiShipmentOfferStatus
>([
  [ShipmentOfferStatus.IN_PREPARATION, 'in_preparation'],
  [ShipmentOfferStatus.AVAILABLE, 'available'],
  [ShipmentOfferStatus.UNAVAILABLE, 'unavailable'],
  [ShipmentOfferStatus.SELECTED, 'selected'],
  [ShipmentOfferStatus.BOUGHT, 'bought'],
  [ShipmentOfferStatus.EXPIRED, 'expired'],
]);

export const API_TO_OFFER_STATUS = new Map<
  ApiShipmentOfferStatus,
  ShipmentOfferStatus
>([...OFFER_STATUS_TO_API.entries()].map(([k, v]) => [v, k]));

export function mapOfferStatusToApi(
  status: ShipmentOfferStatus,
): ApiShipmentOfferStatus {
  return mapOrThrow(OFFER_STATUS_TO_API, status, 'ShipmentOfferStatus');
}
export function mapOfferStatusFromApi(
  apiStatus: ApiShipmentOfferStatus,
): ShipmentOfferStatus {
  return mapOrThrow(API_TO_OFFER_STATUS, apiStatus, 'ApiShipmentOfferStatus');
}
