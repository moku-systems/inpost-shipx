import { ApiPointFunction } from '../../types/api/points/point-function';
import { PointFunctionType } from '../../types/points/point-function';
import { mapOrThrow } from '../shipment/common';

export const POINT_FUNCTION_TO_API = new Map<PointFunctionType, ApiPointFunction>([
  [PointFunctionType.PARCEL, 'parcel'],
  [PointFunctionType.PARCEL_SEND, 'parcel_send'],
  [PointFunctionType.PARCEL_COLLECT, 'parcel_collect'],
  [PointFunctionType.PARCEL_REVERSE_RETURN_SEND, 'parcel_reverse_return_send'],
  [PointFunctionType.STANDARD_LETTER_COLLECT, 'standard_letter_collect'],
  [PointFunctionType.STANDARD_LETTER_SEND, 'standard_letter_send'],
  [PointFunctionType.ALLEGRO_PARCEL_COLLECT, 'allegro_parcel_collect'],
  [PointFunctionType.ALLEGRO_PARCEL_SEND, 'allegro_parcel_send'],
  [PointFunctionType.ALLEGRO_PARCEL_REVERSE_RETURN_SEND, 'allegro_parcel_reverse_return_send'],
  [PointFunctionType.ALLEGRO_LETTER_COLLECT, 'allegro_letter_collect'],
  [PointFunctionType.ALLEGRO_LETTER_SEND, 'allegro_letter_send'],
  [PointFunctionType.ALLEGRO_LETTER_REVERSE_RETURN_SEND, 'allegro_letter_reverse_return_send'],
  [PointFunctionType.ALLEGRO_COURIER_COLLECT, 'allegro_courier_collect'],
  [PointFunctionType.ALLEGRO_COURIER_SEND, 'allegro_courier_send'],
  [PointFunctionType.ALLEGRO_COURIER_REVERSE_RETURN_SEND, 'allegro_courier_reverse_return_send'],
  [PointFunctionType.STANDARD_COURIER_COLLECT, 'standard_courier_collect'],
  [PointFunctionType.STANDARD_COURIER_SEND, 'standard_courier_send'],
  [PointFunctionType.STANDARD_COURIER_REVERSE_RETURN_SEND, 'standard_courier_reverse_return_send'],
  [PointFunctionType.AIR_ON_AIRPORT, 'air_on_airport'],
  [PointFunctionType.AIR_OUTSIDE_AIRPORT, 'air_outside_airport'],
  [PointFunctionType.COOL_PARCEL_COLLECT, 'cool_parcel_collect'],
  [PointFunctionType.LAUNDRY, 'laundry'],
  [PointFunctionType.AVIZO, 'avizo'],
]);

export const API_TO_POINT_FUNCTION = new Map<ApiPointFunction, PointFunctionType>(
  [...POINT_FUNCTION_TO_API.entries()].map(([k, v]) => [v, k]),
);

export function mapPointFunctionFromApi(fn: ApiPointFunction): PointFunctionType {
  return mapOrThrow(API_TO_POINT_FUNCTION, fn, 'ApiPointFunction');
}

export function mapPointFunctionToApi(fn: PointFunctionType): ApiPointFunction {
  return mapOrThrow(POINT_FUNCTION_TO_API, fn, 'PointFunctionType');
}
