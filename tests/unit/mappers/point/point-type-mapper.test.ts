import { describe, expect, it } from '@jest/globals';
import {
  mapPointTypeFromApi,
  mapPointTypeToApi,
  API_TO_POINT_TYPE,
} from '../../../../src/mappers';
import { PointType } from '../../../../src/types/points/point-type';
import { ApiPointType } from '../../../../src/types/api/points/point-type';

describe('mapPointTypeToApi', () => {
  it.each<[PointType, ApiPointType]>([
    [PointType.PARCEL_LOCKER, 'parcel_locker'],
    [PointType.POP, 'pop'],
    [PointType.PARCEL_LOCKER_ONLY, 'parcel_locker_only'],
    [PointType.PARCEL_LOCKER_SUPERPOP, 'parcel_locker_superpop'],
  ])('mapPointTypeToApi(%s) returns "%s"', (type, expected) => {
    expect(mapPointTypeToApi(type)).toBe(expected);
  });

  it('should have a mapping for every PointType', () => {
    for (const type of Object.values(PointType)) {
      expect(() => mapPointTypeToApi(type)).not.toThrow();
    }
  });

  it('should throw for unknown point type', () => {
    expect(() => mapPointTypeToApi('unknown' as PointType)).toThrow();
  });
});

describe('mapPointTypeFromApi', () => {
  it.each<[ApiPointType, PointType]>([
    ['parcel_locker', PointType.PARCEL_LOCKER],
    ['pop', PointType.POP],
    ['parcel_locker_only', PointType.PARCEL_LOCKER_ONLY],
    ['parcel_locker_superpop', PointType.PARCEL_LOCKER_SUPERPOP],
  ])('mapPointTypeFromApi("%s") returns %s', (apiType, expected) => {
    expect(mapPointTypeFromApi(apiType)).toBe(expected);
  });

  it('should have a mapping for every ApiPointType', () => {
    for (const type of API_TO_POINT_TYPE.keys()) {
      expect(() => mapPointTypeFromApi(type)).not.toThrow();
    }
  });

  it('should throw for unknown api point type', () => {
    expect(() => mapPointTypeFromApi('unknown' as ApiPointType)).toThrow();
  });
});
