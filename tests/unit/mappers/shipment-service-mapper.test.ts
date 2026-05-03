import {
  mapServiceFromApi,
  mapServiceToApi,
  API_TO_SERVICE,
} from '../../../src/mappers';
import { ShipmentServiceType } from '../../../src/types/shipment';
import { ApiShipmentService } from '../../../src/types/api/shipment/shipment-service';

describe('mapServiceToApi', () => {
  // 1. Verify the mapping mechanism works (a few representative cases)
  it.each<[ShipmentServiceType, ApiShipmentService]>([
    [ShipmentServiceType.COURIER_C2C, 'inpost_courier_c2c'],
    [ShipmentServiceType.COURIER_EXPRESS_1000, 'inpost_courier_express_1000'],
    [ShipmentServiceType.COURIER_STANDARD, 'inpost_courier_standard'],
    [ShipmentServiceType.LOCKER_STANDARD, 'inpost_locker_standard'],
  ])('mapServiceToApi(%s) returns "%s"', (service, expected) => {
    expect(mapServiceToApi(service)).toBe(expected);
  });

  // 2. Verify completeness — all enum values have a mapping
  it('should have a mapping for every ShipmentService', () => {
    for (const service of Object.values(ShipmentServiceType)) {
      expect(() => mapServiceToApi(service)).not.toThrow();
    }
  });

  // 3. Verify the error case
  it('should throw for unknown service', () => {
    expect(() => mapServiceToApi('unknown' as ShipmentServiceType)).toThrow();
  });
});

describe('mapServiceFromApi', () => {
  // 1. Verify the mapping mechanism works (a few representative cases)
  it.each<[ApiShipmentService, ShipmentServiceType]>([
    ['inpost_courier_c2c', ShipmentServiceType.COURIER_C2C],
    ['inpost_courier_express_1000', ShipmentServiceType.COURIER_EXPRESS_1000],
    ['inpost_courier_standard', ShipmentServiceType.COURIER_STANDARD],
    ['inpost_locker_standard', ShipmentServiceType.LOCKER_STANDARD],
  ])('mapServiceFromApi("%s") returns %s', (apiService, expected) => {
    expect(mapServiceFromApi(apiService)).toBe(expected);
  });

  // 2. Verify completeness — all API service values have a mapping
  it('should have a mapping for every ApiShipmentService', () => {
    for (const service of API_TO_SERVICE.keys()) {
      expect(() => mapServiceFromApi(service)).not.toThrow();
    }
  });

  // 3. Verify the error case
  it('should throw for unknown service', () => {
    expect(() => mapServiceFromApi('unknown' as ApiShipmentService)).toThrow();
  });
});
