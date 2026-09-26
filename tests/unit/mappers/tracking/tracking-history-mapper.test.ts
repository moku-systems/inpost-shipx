import { describe, expect, it } from '@jest/globals';
import { mapTrackingHistoryFromApi } from '../../../../src/mappers';
import type { ApiTrackingResponse } from '../../../../src/types/api/tracking/tracking-history-response';
import {
  ParcelSize,
  PointType,
  ShipmentServiceType,
  ShipmentStatus,
} from '../../../../src/types';

const baseApiTrackingResponse: ApiTrackingResponse = {
  tracking_number: 'INP1234567890',
  type: 'inpost_locker_standard',
  service: 'inpost_locker_standard',
  status: 'ready_to_pickup',
  custom_attributes: {
    size: 'A',
    target_machine_id: 'KRA010',
    target_machine_detail: {
      name: 'KRA010',
      opening_hours: '24/7',
      location: { latitude: 50.0614, longitude: 19.9383 },
      location_description: 'Near the main entrance',
      address: {
        line1: 'ul. Testowa 1',
        line2: '30-001 Kraków',
      },
      type: ['parcel_locker'],
    },
  },
  tracking_details: [
    {
      origin_status: 'created',
      status: 'created',
      agency: null,
      location: null,
      datetime: '2026-01-01T10:00:00Z',
    },
    {
      origin_status: 'ready_to_pickup',
      status: 'ready_to_pickup',
      agency: 'KRA',
      location: 'Kraków',
      datetime: '2026-01-02T15:30:00Z',
    },
  ],
  created_at: '2026-01-01T09:00:00Z',
  updated_at: '2026-01-02T15:30:00Z',
  expected_flow: ['created', 'ready_to_pickup', 'delivered'],
};

describe('mapTrackingHistoryFromApi', () => {
  it('should map tracking history response to SDK model', () => {
    const result = mapTrackingHistoryFromApi(baseApiTrackingResponse);

    expect(result.trackingNumber).toBe('INP1234567890');
    expect(result.service).toBe(ShipmentServiceType.LOCKER_STANDARD);
    expect(result.currentStatus).toBe(ShipmentStatus.READY_TO_PICKUP);
    expect(result.parcelDetails?.parcelSize).toBe(ParcelSize.SMALL);
    expect(result.parcelDetails?.lockerDetails).toEqual({
      name: 'KRA010',
      locationDescription: 'Near the main entrance',
      geoLocation: { latitude: 50.0614, longitude: 19.9383 },
      addressLine: {
        streetLine: 'ul. Testowa 1',
        cityWithPostalCode: '30-001 Kraków',
      },
      type: PointType.PARCEL_LOCKER,
    });
    expect(result.trackingEvents).toEqual([
      {
        status: ShipmentStatus.CREATED,
        timestamp: '2026-01-01T10:00:00Z',
      },
      {
        status: ShipmentStatus.READY_TO_PICKUP,
        timestamp: '2026-01-02T15:30:00Z',
      },
    ]);
  });

  it('should fallback to PARCEL_LOCKER when target machine type is empty', () => {
    const apiResponse: ApiTrackingResponse = {
      ...baseApiTrackingResponse,
      custom_attributes: {
        ...baseApiTrackingResponse.custom_attributes!,
        target_machine_detail: {
          ...baseApiTrackingResponse.custom_attributes!.target_machine_detail,
          type: [],
        },
      },
    };

    const result = mapTrackingHistoryFromApi(apiResponse);

    expect(result.parcelDetails?.lockerDetails?.type).toBe(
      PointType.PARCEL_LOCKER,
    );
  });
});
