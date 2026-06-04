import { describe, expect, it } from '@jest/globals';
import {
  mapPointStatusFromApi,
  mapPointStatusToApi,
  API_TO_POINT_STATUS,
} from '../../../../src/mappers';
import { PointStatus } from '../../../../src/types/points/point-status';
import { PointStatus as ApiPointStatus } from '../../../../src/types/api/points/point-status';

describe('mapPointStatusToApi', () => {
  it.each<[PointStatus, ApiPointStatus]>([
    [PointStatus.OPERATING, 'Operating'],
    [PointStatus.NON_OPERATING, 'NonOperating'],
    [PointStatus.DISABLED, 'Disabled'],
  ])('mapPointStatusToApi(%s) returns "%s"', (status, expected) => {
    expect(mapPointStatusToApi(status)).toBe(expected);
  });

  it('should have a mapping for every PointStatus', () => {
    for (const status of Object.values(PointStatus)) {
      expect(() => mapPointStatusToApi(status)).not.toThrow();
    }
  });

  it('should throw for unknown point status', () => {
    expect(() => mapPointStatusToApi('unknown' as PointStatus)).toThrow();
  });
});

describe('mapPointStatusFromApi', () => {
  it.each<[ApiPointStatus, PointStatus]>([
    ['Operating', PointStatus.OPERATING],
    ['NonOperating', PointStatus.NON_OPERATING],
    ['Disabled', PointStatus.DISABLED],
  ])('mapPointStatusFromApi("%s") returns %s', (apiStatus, expected) => {
    expect(mapPointStatusFromApi(apiStatus)).toBe(expected);
  });

  it('should have a mapping for every ApiPointStatus', () => {
    for (const status of API_TO_POINT_STATUS.keys()) {
      expect(() => mapPointStatusFromApi(status)).not.toThrow();
    }
  });

  it('should throw for unknown api point status', () => {
    expect(() => mapPointStatusFromApi('unknown' as ApiPointStatus)).toThrow();
  });
});
