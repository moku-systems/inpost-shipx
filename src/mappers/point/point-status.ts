import { PointStatus as ApiPointStatus } from '../../types/api/points/point-status';
import { PointStatus } from '../../types/points/point-status';
import { mapOrThrow } from '../shipment/common';

export const POINT_STATUS_TO_API = new Map<PointStatus, ApiPointStatus>([
  [PointStatus.OPERATING, 'Operating'],
  [PointStatus.NON_OPERATING, 'NonOperating'],
  [PointStatus.DISABLED, 'Disabled'],
]);

export const API_TO_POINT_STATUS = new Map<ApiPointStatus, PointStatus>(
  [...POINT_STATUS_TO_API.entries()].map(([k, v]) => [v, k]),
);

export function mapPointStatusFromApi(status: ApiPointStatus): PointStatus {
  return mapOrThrow(API_TO_POINT_STATUS, status, 'ApiPointStatus');
}

export function mapPointStatusToApi(status: PointStatus): ApiPointStatus {
  return mapOrThrow(POINT_STATUS_TO_API, status, 'PointStatus');
}
