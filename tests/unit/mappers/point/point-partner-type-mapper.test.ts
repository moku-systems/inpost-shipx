import { describe, expect, it } from '@jest/globals';
import {
  mapPartnerTypeFromApi,
  mapPartnerTypeToApi,
  API_TO_PARTNER_TYPE,
} from '../../../../src/mappers';
import { PointPartnerType } from '../../../../src/types/points/point-partner-type';
import { ApiPointPartnerType } from '../../../../src/types/api/points/point-partner-type';

describe('mapPartnerTypeToApi', () => {
  it.each<[PointPartnerType, ApiPointPartnerType]>([
    [PointPartnerType.PARCEL_LOCKER, '0'],
    [PointPartnerType.SUPER_POP, '30'],
    [PointPartnerType.POP, '33'],
  ])('mapPartnerTypeToApi(%s) returns "%s"', (type, expected) => {
    expect(mapPartnerTypeToApi(type)).toBe(expected);
  });

  it('should have a mapping for every PointPartnerType', () => {
    for (const type of Object.values(PointPartnerType)) {
      expect(() => mapPartnerTypeToApi(type)).not.toThrow();
    }
  });

  it('should throw for unknown partner type', () => {
    expect(() => mapPartnerTypeToApi('unknown' as PointPartnerType)).toThrow();
  });
});

describe('mapPartnerTypeFromApi', () => {
  it.each<[number, PointPartnerType]>([
    [0, PointPartnerType.PARCEL_LOCKER],
    [30, PointPartnerType.SUPER_POP],
    [33, PointPartnerType.POP],
  ])('mapPartnerTypeFromApi(%i) returns %s', (partnerId, expected) => {
    expect(mapPartnerTypeFromApi(partnerId)).toBe(expected);
  });

  it('should have a mapping for every ApiPointPartnerType', () => {
    for (const type of API_TO_PARTNER_TYPE.keys()) {
      expect(() => mapPartnerTypeFromApi(Number(type))).not.toThrow();
    }
  });

  it('should throw for unknown partner id', () => {
    expect(() => mapPartnerTypeFromApi(999)).toThrow();
  });
});
