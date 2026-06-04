import { describe, expect, it } from '@jest/globals';
import {
  mapPointFunctionFromApi,
  mapPointFunctionToApi,
  API_TO_POINT_FUNCTION,
} from '../../../../src/mappers';
import { PointFunctionType } from '../../../../src/types/points/point-function';
import { ApiPointFunction } from '../../../../src/types/api/points/point-function';

describe('mapPointFunctionToApi', () => {
  it.each<[PointFunctionType, ApiPointFunction]>([
    [PointFunctionType.PARCEL, 'parcel'],
    [PointFunctionType.PARCEL_SEND, 'parcel_send'],
    [PointFunctionType.PARCEL_COLLECT, 'parcel_collect'],
    [PointFunctionType.ALLEGRO_PARCEL_SEND, 'allegro_parcel_send'],
    [PointFunctionType.COOL_PARCEL_COLLECT, 'cool_parcel_collect'],
  ])('mapPointFunctionToApi(%s) returns "%s"', (fn, expected) => {
    expect(mapPointFunctionToApi(fn)).toBe(expected);
  });

  it('should have a mapping for every PointFunctionType', () => {
    for (const fn of Object.values(PointFunctionType)) {
      expect(() => mapPointFunctionToApi(fn)).not.toThrow();
    }
  });

  it('should throw for unknown point function', () => {
    expect(() =>
      mapPointFunctionToApi('unknown' as PointFunctionType),
    ).toThrow();
  });
});

describe('mapPointFunctionFromApi', () => {
  it.each<[ApiPointFunction, PointFunctionType]>([
    ['parcel', PointFunctionType.PARCEL],
    ['parcel_send', PointFunctionType.PARCEL_SEND],
    ['parcel_collect', PointFunctionType.PARCEL_COLLECT],
    ['allegro_parcel_send', PointFunctionType.ALLEGRO_PARCEL_SEND],
    ['cool_parcel_collect', PointFunctionType.COOL_PARCEL_COLLECT],
  ])('mapPointFunctionFromApi("%s") returns %s', (apiFn, expected) => {
    expect(mapPointFunctionFromApi(apiFn)).toBe(expected);
  });

  it('should have a mapping for every ApiPointFunction', () => {
    for (const fn of API_TO_POINT_FUNCTION.keys()) {
      expect(() => mapPointFunctionFromApi(fn)).not.toThrow();
    }
  });

  it('should throw for unknown api point function', () => {
    expect(() =>
      mapPointFunctionFromApi('unknown' as ApiPointFunction),
    ).toThrow();
  });
});
