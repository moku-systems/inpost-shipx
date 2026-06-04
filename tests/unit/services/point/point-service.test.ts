import { jest, describe, expect, it, beforeEach } from '@jest/globals';
import { PointService } from '../../../../src/services/point-service';
import type { ApiListResponse } from '../../../../src/types/api/common';
import type { ApiPointResponse } from '../../../../src/types/api/points/point-response';
import { PointType } from '../../../../src/types/points/point-type';
import { PointStatus } from '../../../../src/types/points/point-status';
import { PointFunctionType } from '../../../../src/types/points/point-function';
import { PointPartnerType } from '../../../../src/types/points/point-partner-type';
import type { GetPointListInput } from '../../../../src/types/points';

const mockClient = {
  getFromGateway: jest.fn(),
};

const baseApiPoint: ApiPointResponse = {
  name: 'KRA010',
  type: ['parcel_locker'],
  status: 'Operating',
  location: { longitude: 19.945, latitude: 50.062 },
  location_type: null,
  location_description: null,
  location_description_1: null,
  location_description_2: null,
  distance: null,
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
  phone_number: null,
  payment_point_descr: null,
  functions: ['parcel', 'parcel_send'],
  partner_id: 0,
  is_next: false,
  payment_available: true,
  payment_type: {},
  virtual: '0',
  recommended_low_interest_box_machines_list: null,
  location_247: true,
  easy_access_zone: false,
  physical_type_mapped: null,
  physical_type_description: null,
  supported_locker_temperatures: null,
  operating_hours_extended: null,
  image_url: null,
};

describe('PointService', () => {
  let service: PointService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new PointService(mockClient as any);
  });

  describe('list', () => {
    it('should call GET /points without params when no input is provided', async () => {
      const apiResponse: ApiListResponse<ApiPointResponse> = {
        items: [baseApiPoint],
        count: 1,
        page: 1,
        per_page: 25,
        total_pages: 1,
      };
      mockClient.getFromGateway.mockResolvedValue(apiResponse as never);

      const result = await service.list();

      expect(mockClient.getFromGateway).toHaveBeenCalledWith('/points', {
        params: undefined,
      });
      expect(result.items).toHaveLength(1);
      expect(result.items[0].name).toBe('KRA010');
    });

    it('should call GET /points with mapped query params', async () => {
      const apiResponse: ApiListResponse<ApiPointResponse> = {
        items: [],
        count: 0,
        page: 1,
        per_page: 25,
        total_pages: 0,
      };
      mockClient.getFromGateway.mockResolvedValue(apiResponse as never);

      const input: GetPointListInput = {
        type: PointType.PARCEL_LOCKER,
        city: 'Kraków',
        page: 1,
        perPage: 10,
      };

      await service.list(input);

      expect(mockClient.getFromGateway).toHaveBeenCalledWith(
        '/points',
        expect.objectContaining({
          params: expect.objectContaining({
            type: 'parcel_locker',
            city: 'Kraków',
            page: 1,
            per_page: 10,
          }),
        }),
      );
    });

    it('should return mapped paginated response', async () => {
      const apiResponse: ApiListResponse<ApiPointResponse> = {
        items: [baseApiPoint, { ...baseApiPoint, name: 'WAW001' }],
        count: 2,
        page: 2,
        per_page: 25,
        total_pages: 5,
      };
      mockClient.getFromGateway.mockResolvedValue(apiResponse as never);

      const result = await service.list();

      expect(result.count).toBe(2);
      expect(result.page).toBe(2);
      expect(result.perPage).toBe(25);
      expect(result.totalPages).toBe(5);
      expect(result.items[1].name).toBe('WAW001');
    });

    it('should map returned points with correct types', async () => {
      const apiResponse: ApiListResponse<ApiPointResponse> = {
        items: [baseApiPoint],
        count: 1,
        page: 1,
        per_page: 25,
        total_pages: 1,
      };
      mockClient.getFromGateway.mockResolvedValue(apiResponse as never);

      const result = await service.list();
      const point = result.items[0];

      expect(point.type).toEqual([PointType.PARCEL_LOCKER]);
      expect(point.status).toBe(PointStatus.OPERATING);
      expect(point.functions).toEqual([
        PointFunctionType.PARCEL,
        PointFunctionType.PARCEL_SEND,
      ]);
      expect(point.partnerId).toBe(PointPartnerType.PARCEL_LOCKER);
    });

    it('should propagate errors from the client', async () => {
      mockClient.getFromGateway.mockRejectedValue(
        new Error('network error') as never,
      );

      await expect(service.list()).rejects.toThrow('network error');
    });
  });

  describe('get', () => {
    it('should call GET /points/:name with the correct endpoint', async () => {
      mockClient.getFromGateway.mockResolvedValue(baseApiPoint as never);

      await service.get('KRA010');

      expect(mockClient.getFromGateway).toHaveBeenCalledWith('/points/KRA010');
    });

    it('should return a mapped point', async () => {
      mockClient.getFromGateway.mockResolvedValue(baseApiPoint as never);

      const result = await service.get('KRA010');

      expect(result.name).toBe('KRA010');
      expect(result.type).toEqual([PointType.PARCEL_LOCKER]);
      expect(result.status).toBe(PointStatus.OPERATING);
      expect(result.location).toEqual({ longitude: 19.945, latitude: 50.062 });
    });

    it('should map addressDetails correctly', async () => {
      mockClient.getFromGateway.mockResolvedValue(baseApiPoint as never);

      const result = await service.get('KRA010');

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

    it('should propagate errors from the client', async () => {
      mockClient.getFromGateway.mockRejectedValue(
        new Error('not found') as never,
      );

      await expect(service.get('INVALID')).rejects.toThrow('not found');
    });
  });
});
