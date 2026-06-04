import { ApiPointType } from '../../types/api/points/point-type';
import { PointType } from '../../types/points/point-type';
import { mapOrThrow } from '../shipment/common';

export const POINT_TYPE_TO_API = new Map<PointType, ApiPointType>([
  [PointType.PARCEL_LOCKER, 'parcel_locker'],
  [PointType.POP, 'pop'],
  [PointType.PARCEL_LOCKER_ONLY, 'parcel_locker_only'],
  [PointType.PARCEL_LOCKER_SUPERPOP, 'parcel_locker_superpop'],
]);

export const API_TO_POINT_TYPE = new Map<ApiPointType, PointType>(
  [...POINT_TYPE_TO_API.entries()].map(([k, v]) => [v, k]),
);

export function mapPointTypeFromApi(type: ApiPointType): PointType {
  return mapOrThrow(API_TO_POINT_TYPE, type, 'ApiPointType');
}

export function mapPointTypeToApi(type: PointType): ApiPointType {
  return mapOrThrow(POINT_TYPE_TO_API, type, 'PointType');
}
