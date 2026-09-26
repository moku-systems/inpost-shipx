import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { TrackingService } from '../../../../src/services/tracking-service';
import type { ApiTrackingResponse } from '../../../../src/types/api/tracking/tracking-history-response';
import type { ApiTrackingServiceHistoryResponse } from '../../../../src/types/api/tracking/tracking-service-history-response';
import {
  ParcelSize,
  PointType,
  ShipmentServiceType,
  ShipmentStatus,
} from '../../../../src/types';

const mockClient = {
  get: jest.fn(),
};

const trackingId = 'INP1234567890';

describe('TrackingService', () => {
  let service: TrackingService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TrackingService(mockClient as any);
  });

  describe('serviceHistory', () => {
    it('should call GET /tracking/:trackingId/service_history and return mapped response', async () => {
      const apiResponse: ApiTrackingServiceHistoryResponse = {
        href: `/tracking/${trackingId}/service_history`,
        id: 'shipment-123',
        service_history: {
          last_service: 'inpost_locker_standard',
          updated_at: '2026-01-03T12:00:00Z',
        },
      };
      mockClient.get.mockResolvedValue(apiResponse as never);

      const result = await service.serviceHistory(trackingId);

      expect(mockClient.get).toHaveBeenCalledWith(
        `/tracking/${trackingId}/service_history`,
      );
      expect(result).toEqual({
        shipmentId: 'shipment-123',
        lastService: ShipmentServiceType.LOCKER_STANDARD,
        updatedAt: '2026-01-03T12:00:00Z',
      });
    });

    it('should propagate errors from the client', async () => {
      mockClient.get.mockRejectedValue(new Error('network error') as never);

      await expect(service.serviceHistory(trackingId)).rejects.toThrow(
        'network error',
      );
    });
  });

  describe('trackingEvents', () => {
    it('should call GET /tracking/:trackingId and return mapped response', async () => {
      const apiResponse: ApiTrackingResponse = {
        tracking_number: trackingId,
        type: 'inpost_locker_standard',
        service: 'inpost_locker_standard',
        status: 'delivered',
        custom_attributes: {
          size: 'C',
          target_machine_id: 'WAW001',
          target_machine_detail: {
            name: 'WAW001',
            opening_hours: '24/7',
            location: { latitude: 52.2297, longitude: 21.0122 },
            location_description: 'Next to station entrance',
            address: {
              line1: 'ul. Kolejowa 1',
              line2: '00-001 Warszawa',
            },
            type: ['pop'],
          },
        },
        tracking_details: [
          {
            origin_status: 'created',
            status: 'created',
            agency: null,
            location: null,
            datetime: '2026-01-01T08:00:00Z',
          },
          {
            origin_status: 'delivered',
            status: 'delivered',
            agency: 'WAW',
            location: 'Warszawa',
            datetime: '2026-01-02T18:00:00Z',
          },
        ],
        created_at: '2026-01-01T07:00:00Z',
        updated_at: '2026-01-02T18:00:00Z',
        expected_flow: ['created', 'delivered'],
      };
      mockClient.get.mockResolvedValue(apiResponse as never);

      const result = await service.trackingEvents(trackingId);

      expect(mockClient.get).toHaveBeenCalledWith(`/tracking/${trackingId}`);
      expect(result.trackingNumber).toBe(trackingId);
      expect(result.service).toBe(ShipmentServiceType.LOCKER_STANDARD);
      expect(result.currentStatus).toBe(ShipmentStatus.DELIVERED);
      expect(result.parcelDetails?.parcelSize).toBe(ParcelSize.LARGE);
      expect(result.parcelDetails?.lockerDetails?.type).toBe(PointType.POP);
      expect(result.trackingEvents).toEqual([
        {
          status: ShipmentStatus.CREATED,
          timestamp: '2026-01-01T08:00:00Z',
        },
        {
          status: ShipmentStatus.DELIVERED,
          timestamp: '2026-01-02T18:00:00Z',
        },
      ]);
    });

    it('should propagate errors from the client', async () => {
      mockClient.get.mockRejectedValue(
        new Error('tracking unavailable') as never,
      );

      await expect(service.trackingEvents(trackingId)).rejects.toThrow(
        'tracking unavailable',
      );
    });
  });
});
