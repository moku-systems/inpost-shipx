import { describe, expect, it } from '@jest/globals';
import { mapTrackingServiceHistoryFromApi } from '../../../../src/mappers';
import type { ApiTrackingServiceHistoryResponse } from '../../../../src/types/api/tracking/tracking-service-history-response';
import { ShipmentServiceType } from '../../../../src/types';

describe('mapTrackingServiceHistoryFromApi', () => {
  it('should map tracking service history response to SDK model', () => {
    const apiResponse: ApiTrackingServiceHistoryResponse = {
      href: '/tracking/INP1234567890/service_history',
      id: 'shipment-123',
      service_history: {
        last_service: 'inpost_courier_standard',
        updated_at: '2026-01-03T12:00:00Z',
      },
    };

    const result = mapTrackingServiceHistoryFromApi(apiResponse);

    expect(result).toEqual({
      shipmentId: 'shipment-123',
      lastService: ShipmentServiceType.COURIER_STANDARD,
      updatedAt: '2026-01-03T12:00:00Z',
    });
  });
});
