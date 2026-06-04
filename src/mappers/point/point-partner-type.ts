import { ApiPointPartnerType } from '../../types/api/points/point-partner-type';
import { PointPartnerType } from '../../types/points/point-partner-type';
import { mapOrThrow } from '../shipment/common';

export const PARTNER_TYPE_TO_API = new Map<PointPartnerType, ApiPointPartnerType>([
  [PointPartnerType.PARCEL_LOCKER, '0'],
  [PointPartnerType.SUPER_POP, '30'],
  [PointPartnerType.POP, '33'],
]);

export const API_TO_PARTNER_TYPE = new Map<ApiPointPartnerType, PointPartnerType>(
  [...PARTNER_TYPE_TO_API.entries()].map(([k, v]) => [v, k]),
);

export function mapPartnerTypeFromApi(partnerId: number): PointPartnerType {
  return mapOrThrow(
    API_TO_PARTNER_TYPE,
    String(partnerId) as ApiPointPartnerType,
    'ApiPointPartnerType',
  );
}

export function mapPartnerTypeToApi(partnerType: PointPartnerType): ApiPointPartnerType {
  return mapOrThrow(PARTNER_TYPE_TO_API, partnerType, 'PointPartnerType');
}
