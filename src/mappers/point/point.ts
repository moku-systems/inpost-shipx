import type { ApiPointResponse } from '../../types/api/points/point-response';
import type { ApiListResponse } from '../../types/api/common';
import type { PaginatedResponse } from '../../types/common/pagination';
import type { PointResponse, GetPointListInput } from '../../types/points';
import { CountryCode } from '../../types/common/address';

import { mapPointTypeFromApi, mapPointTypeToApi } from './point-type';
import { mapPointStatusFromApi } from './point-status';
import {
  mapPointFunctionFromApi,
  mapPointFunctionToApi,
} from './point-function';
import {
  mapPartnerTypeFromApi,
  mapPartnerTypeToApi,
} from './point-partner-type';

// ═══════════════════════════════════════════════════════════════
//  API RESPONSE  ->  OUTPUT
// ═══════════════════════════════════════════════════════════════

function mapOperatingHoursFromApi(
  extended: ApiPointResponse['operating_hours_extended'],
): PointResponse['operatingHoursDetails'] {
  if (!extended?.customer) return null;
  return Object.entries(extended.customer).map(([day, hours]) => ({
    day,
    hours,
  }));
}

export function mapPointFromApi(api: ApiPointResponse): PointResponse {
  const descriptions = [
    api.location_description,
    api.location_description_1,
    api.location_description_2,
  ].filter((d): d is string => d !== null);

  return {
    name: api.name,
    type: api.type.map(mapPointTypeFromApi),
    status: mapPointStatusFromApi(api.status),
    location: api.location,
    locationType: api.location_type,
    locationDescriptions: descriptions.length > 0 ? descriptions : null,
    distance: api.distance,
    openingHours: api.opening_hours,
    address: api.address,
    addressDetails: {
      streetName: api.address_details.street,
      streetNumber: api.address_details.building_number,
      apartmentNumber: api.address_details.flat_number ?? undefined,
      city: api.address_details.city,
      postalCode: api.address_details.post_code,
      voivodeship: api.address_details.province,
      countryCode: CountryCode.PL,
    },
    phoneNumber: api.phone_number,
    paymentPointDescription: api.payment_point_descr,
    functions: api.functions.map(mapPointFunctionFromApi),
    partnerId: mapPartnerTypeFromApi(api.partner_id),
    nextLockerType: api.is_next,
    paymentAvailable: api.payment_available,
    paymentType: api.payment_type,
    virtual: api.virtual,
    recommendedLowInterestBoxMachines:
      api.recommended_low_interest_box_machines_list,
    location247: api.location_247,
    hasEasyAccessZone: api.easy_access_zone,
    physicalTypeMapped: api.physical_type_mapped,
    physicalTypeDescription: api.physical_type_description,
    supportedLockerTemperatures: api.supported_locker_temperatures,
    operatingHoursDetails: mapOperatingHoursFromApi(
      api.operating_hours_extended,
    ),
    imageUrl: api.image_url,
  };
}

export function mapPointListFromApi(
  api: ApiListResponse<ApiPointResponse>,
): PaginatedResponse<PointResponse> {
  return {
    items: api.items.map(mapPointFromApi),
    count: api.count,
    page: api.page,
    perPage: api.per_page,
    totalPages: api.total_pages,
  };
}

// ═══════════════════════════════════════════════════════════════
//  INPUT  ->  API REQUEST
// ═══════════════════════════════════════════════════════════════

function joinOrValue<T>(
  value: T | T[] | undefined,
  mapFn: (v: T) => string,
): string | undefined {
  if (value === undefined) return undefined;
  if (Array.isArray(value)) return value.map(mapFn).join(',');
  return mapFn(value);
}

export function mapPointListParamsToApi(
  input: GetPointListInput,
): Record<string, string | number | boolean | undefined> {
  return {
    name: joinOrValue(input.name, v => v),
    type: joinOrValue(input.type, mapPointTypeToApi),
    functions: joinOrValue(input.functions, mapPointFunctionToApi),
    partner_id: joinOrValue(input.partnerId, mapPartnerTypeToApi),
    is_next: input.isNext,
    payment_available: input.paymentAvailable,
    post_code: joinOrValue(input.postCode, v => v),
    city: joinOrValue(input.city, v => v),
    province: joinOrValue(input.province, v => v),
    virtual: joinOrValue(input.virtual, String),
    updated_from: input.updatedFrom,
    updated_to: input.updatedTo,
    location_247: input.location247,
    supported_locker_temperatures: joinOrValue(
      input.supportedLockerTemperatures,
      String,
    ),
    relative_point: input.relativePoint,
    relative_post_code: input.relativePostCode,
    max_distance: input.maxDistance,
    limit: input.limit,
    sort_by: input.sortBy,
    sort_order: input.sortOrder,
    page: input.page,
    per_page: input.perPage,
    fields: input.fields,
  };
}
