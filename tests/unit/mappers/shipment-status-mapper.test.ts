import {
  mapStatusFromApi,
  mapStatusToApi,
  API_TO_STATUS,
} from '../../../src/mappers';
import { ShipmentStatus } from '../../../src/types/';
import { ApiShipmentStatus } from '../../../src/types/api/status/shipment-status';

describe('mapStatusToApi', () => {
  // 1. Verify the mapping mechanism works (a few representative cases)
  it.each<[ShipmentStatus, ApiShipmentStatus]>([
    [ShipmentStatus.CREATED, 'created'],
    [ShipmentStatus.DELIVERED, 'delivered'],
    [ShipmentStatus.CANCELLED, 'cancelled'],
  ])('mapStatusToApi(%s) returns "%s"', (status, expected) => {
    expect(mapStatusToApi(status)).toBe(expected);
  });

  // 2. Verify completeness — all enum values have a mapping
  it('should have a mapping for every ShipmentStatus', () => {
    for (const status of Object.values(ShipmentStatus)) {
      expect(() => mapStatusToApi(status)).not.toThrow();
    }
  });

  // 3. Verify the error case
  it('should throw for unknown status', () => {
    expect(() => mapStatusToApi('unknown' as ShipmentStatus)).toThrow();
  });
});

describe('mapStatusFromApi', () => {
  // 1. Verify the mapping mechanism works (a few representative cases)
  it.each<[ApiShipmentStatus, ShipmentStatus]>([
    ['created', ShipmentStatus.CREATED],
    ['delivered', ShipmentStatus.DELIVERED],
    ['cancelled', ShipmentStatus.CANCELLED],
  ])('mapStatusFromApi("%s") returns %s', (apiStatus, expected) => {
    expect(mapStatusFromApi(apiStatus)).toBe(expected);
  });

  // 2. Verify completeness — all API status values have a mapping
  it('should have a mapping for every ApiShipmentStatus', () => {
    for (const status of API_TO_STATUS.keys()) {
      expect(() => mapStatusFromApi(status)).not.toThrow();
    }
  });

  // 3. Verify the error case
  it('should throw for unknown status', () => {
    expect(() => mapStatusFromApi('unknown' as ApiShipmentStatus)).toThrow();
  });
});
