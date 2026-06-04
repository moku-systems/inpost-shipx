import { describe, expect, it } from '@jest/globals';
import {
  mapPointFromApi,
  mapPointListFromApi,
  mapPointListParamsToApi,
} from '../../../../src/mappers';
import type { ApiPointResponse } from '../../../../src/types/api/points/point-response';
import type { ApiListResponse } from '../../../../src/types/api/common';
import { PointType } from '../../../../src/types/points/point-type';
import { PointStatus } from '../../../../src/types/points/point-status';
import { PointFunctionType } from '../../../../src/types/points/point-function';
import { PointPartnerType } from '../../../../src/types/points/point-partner-type';
import type { GetPointListInput } from '../../../../src/types/points';

const baseApiPoint: ApiPointResponse = {
  name: 'KRA010',
  type: ['parcel_locker'],
  status: 'Operating',
  location: { longitude: 19.945, latitude: 50.062 },
  location_type: 'outdoor',
  location_description: 'Near entrance',
  location_description_1: 'On the left',
  location_description_2: null,
  distance: 100,
  opening_hours: '24/7',
  address: { line1: 'ul. Testowa 1', line2: '30-001 Kraków' },
  address_details: {
    city: 'Kraków',
    province: 'małopolskie',
    post_code: '30-001',
    street: 'Testowa',
    building_number: '1',
    flat_number: null,
  },
  phone_number: '+48123456789',
  payment_point_descr: null,
  functions: ['parcel', 'parcel_send'],
  partner_id: 0,
  is_next: false,
  payment_available: true,
  payment_type: { blik: 'BLIK' },
  virtual: '0',
  recommended_low_interest_box_machines_list: null,
  location_247: true,
  easy_access_zone: false,
  physical_type_mapped: null,
  physical_type_description: null,
  supported_locker_temperatures: null,
  operating_hours_extended: null,
  image_url: 'https://example.com/image.jpg',
};

describe('mapPointFromApi', () => {
  it('should map a basic point correctly', () => {
    const result = mapPointFromApi(baseApiPoint);

    expect(result.name).toBe('KRA010');
    expect(result.type).toEqual([PointType.PARCEL_LOCKER]);
    expect(result.status).toBe(PointStatus.OPERATING);
    expect(result.location).toEqual({ longitude: 19.945, latitude: 50.062 });
    expect(result.locationType).toBe('outdoor');
    expect(result.distance).toBe(100);
    expect(result.openingHours).toBe('24/7');
    expect(result.address).toEqual({
      line1: 'ul. Testowa 1',
      line2: '30-001 Kraków',
    });
    expect(result.phoneNumber).toBe('+48123456789');
    expect(result.paymentPointDescription).toBeNull();
    expect(result.functions).toEqual([
      PointFunctionType.PARCEL,
      PointFunctionType.PARCEL_SEND,
    ]);
    expect(result.partnerId).toBe(PointPartnerType.PARCEL_LOCKER);
    expect(result.nextLockerType).toBe(false);
    expect(result.paymentAvailable).toBe(true);
    expect(result.paymentType).toEqual({ blik: 'BLIK' });
    expect(result.virtual).toBe('0');
    expect(result.location247).toBe(true);
    expect(result.hasEasyAccessZone).toBe(false);
    expect(result.imageUrl).toBe('https://example.com/image.jpg');
    expect(result.operatingHoursDetails).toBeNull();
  });

  it('should map addressDetails correctly', () => {
    const result = mapPointFromApi(baseApiPoint);

    expect(result.addressDetails).toEqual({
      streetName: 'Testowa',
      streetNumber: '1',
      apartmentNumber: undefined,
      city: 'Kraków',
      postalCode: '30-001',
      voivodeship: 'małopolskie',
      countryCode: 'PL',
    });
  });

  it('should include flat_number in addressDetails when present', () => {
    const api: ApiPointResponse = {
      ...baseApiPoint,
      address_details: { ...baseApiPoint.address_details, flat_number: '5' },
    };

    const result = mapPointFromApi(api);

    expect(result.addressDetails.apartmentNumber).toBe('5');
  });

  it('should collect non-null location descriptions', () => {
    const result = mapPointFromApi(baseApiPoint);

    expect(result.locationDescriptions).toEqual([
      'Near entrance',
      'On the left',
    ]);
  });

  it('should return null locationDescriptions when all descriptions are null', () => {
    const api: ApiPointResponse = {
      ...baseApiPoint,
      location_description: null,
      location_description_1: null,
      location_description_2: null,
    };

    const result = mapPointFromApi(api);

    expect(result.locationDescriptions).toBeNull();
  });

  it('should map operating_hours_extended when present', () => {
    const api: ApiPointResponse = {
      ...baseApiPoint,
      operating_hours_extended: {
        customer: {
          monday: [{ start: 800, end: 2000 }],
          tuesday: [{ start: 800, end: 2000 }],
        },
      },
    };

    const result = mapPointFromApi(api);

    expect(result.operatingHoursDetails).toEqual([
      { day: 'monday', hours: [{ start: 800, end: 2000 }] },
      { day: 'tuesday', hours: [{ start: 800, end: 2000 }] },
    ]);
  });

  it('should return null operatingHoursDetails when customer is null', () => {
    const api: ApiPointResponse = {
      ...baseApiPoint,
      operating_hours_extended: { customer: null },
    };

    const result = mapPointFromApi(api);

    expect(result.operatingHoursDetails).toBeNull();
  });

  it('should map multiple types', () => {
    const api: ApiPointResponse = {
      ...baseApiPoint,
      type: ['parcel_locker', 'pop'],
    };

    const result = mapPointFromApi(api);

    expect(result.type).toEqual([PointType.PARCEL_LOCKER, PointType.POP]);
  });
});

describe('mapPointListFromApi', () => {
  it('should map a paginated list response', () => {
    const apiList: ApiListResponse<ApiPointResponse> = {
      items: [baseApiPoint],
      count: 1,
      page: 1,
      per_page: 25,
      total_pages: 1,
    };

    const result = mapPointListFromApi(apiList);

    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe('KRA010');
    expect(result.count).toBe(1);
    expect(result.page).toBe(1);
    expect(result.perPage).toBe(25);
    expect(result.totalPages).toBe(1);
  });

  it('should map an empty list', () => {
    const apiList: ApiListResponse<ApiPointResponse> = {
      items: [],
      count: 0,
      page: 1,
      per_page: 25,
      total_pages: 0,
    };

    const result = mapPointListFromApi(apiList);

    expect(result.items).toEqual([]);
    expect(result.count).toBe(0);
  });

  it('should map multiple items', () => {
    const second: ApiPointResponse = { ...baseApiPoint, name: 'WAW001' };
    const apiList: ApiListResponse<ApiPointResponse> = {
      items: [baseApiPoint, second],
      count: 2,
      page: 1,
      per_page: 25,
      total_pages: 1,
    };

    const result = mapPointListFromApi(apiList);

    expect(result.items).toHaveLength(2);
    expect(result.items[1].name).toBe('WAW001');
  });
});

describe('mapPointListParamsToApi', () => {
  it('should return undefined for all fields when input is empty', () => {
    const result = mapPointListParamsToApi({});

    expect(result.name).toBeUndefined();
    expect(result.type).toBeUndefined();
    expect(result.functions).toBeUndefined();
    expect(result.partner_id).toBeUndefined();
    expect(result.is_next).toBeUndefined();
  });

  it('should map a single type', () => {
    const input: GetPointListInput = { type: PointType.PARCEL_LOCKER };

    const result = mapPointListParamsToApi(input);

    expect(result.type).toBe('parcel_locker');
  });

  it('should join multiple types with comma', () => {
    const input: GetPointListInput = {
      type: [PointType.PARCEL_LOCKER, PointType.POP],
    };

    const result = mapPointListParamsToApi(input);

    expect(result.type).toBe('parcel_locker,pop');
  });

  it('should map a single function', () => {
    const input: GetPointListInput = { functions: PointFunctionType.PARCEL };

    const result = mapPointListParamsToApi(input);

    expect(result.functions).toBe('parcel');
  });

  it('should join multiple functions with comma', () => {
    const input: GetPointListInput = {
      functions: [PointFunctionType.PARCEL, PointFunctionType.PARCEL_SEND],
    };

    const result = mapPointListParamsToApi(input);

    expect(result.functions).toBe('parcel,parcel_send');
  });

  it('should map a single partnerId', () => {
    const input: GetPointListInput = { partnerId: PointPartnerType.POP };

    const result = mapPointListParamsToApi(input);

    expect(result.partner_id).toBe('33');
  });

  it('should map boolean and string fields', () => {
    const input: GetPointListInput = {
      isNext: true,
      paymentAvailable: false,
      location247: true,
      city: 'Kraków',
      postCode: '30-001',
      province: 'małopolskie',
    };

    const result = mapPointListParamsToApi(input);

    expect(result.is_next).toBe(true);
    expect(result.payment_available).toBe(false);
    expect(result.location_247).toBe(true);
    expect(result.city).toBe('Kraków');
    expect(result.post_code).toBe('30-001');
    expect(result.province).toBe('małopolskie');
  });

  it('should join multiple city values', () => {
    const input: GetPointListInput = { city: ['Kraków', 'Warszawa'] };

    const result = mapPointListParamsToApi(input);

    expect(result.city).toBe('Kraków,Warszawa');
  });

  it('should map pagination and sorting fields', () => {
    const input: GetPointListInput = {
      page: 2,
      perPage: 50,
      sortBy: 'distance_to_relative_point',
      sortOrder: 'asc',
    };

    const result = mapPointListParamsToApi(input);

    expect(result.page).toBe(2);
    expect(result.per_page).toBe(50);
    expect(result.sort_by).toBe('distance_to_relative_point');
    expect(result.sort_order).toBe('asc');
  });

  it('should map location proximity fields', () => {
    const input: GetPointListInput = {
      relativePoint: '50.062,19.945',
      relativePostCode: '30-001',
      maxDistance: 5000,
    };

    const result = mapPointListParamsToApi(input);

    expect(result.relative_point).toBe('50.062,19.945');
    expect(result.relative_post_code).toBe('30-001');
    expect(result.max_distance).toBe(5000);
  });

  it('should map updatedFrom and updatedTo', () => {
    const input: GetPointListInput = {
      updatedFrom: '2026-01-01',
      updatedTo: '2026-06-01',
    };

    const result = mapPointListParamsToApi(input);

    expect(result.updated_from).toBe('2026-01-01');
    expect(result.updated_to).toBe('2026-06-01');
  });
});
