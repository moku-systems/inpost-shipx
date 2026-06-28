import { ApiShipmentTransactionStatus } from '../../types/api/status/shipment-transaction-status';
import { ShipmentTransactionStatus } from '../../types/status/shipment-transaction-status';
import { mapOrThrow } from '../shipment';

export const SHIPMENT_TRANSACTION_STATUS = new Map<
  ShipmentTransactionStatus,
  ApiShipmentTransactionStatus
>([
  [ShipmentTransactionStatus.INITIATED, 'initiated'],
  [ShipmentTransactionStatus.SUCCESS, 'success'],
  [ShipmentTransactionStatus.FAILURE, 'failure'],
]);

export const API_TO_SHIPMENT_TRANSACTION_STATUS = new Map<
  ApiShipmentTransactionStatus,
  ShipmentTransactionStatus
>([...SHIPMENT_TRANSACTION_STATUS.entries()].map(([k, v]) => [v, k]));

export function mapShipmentTransactionStatusToApi(
  status: ShipmentTransactionStatus,
): ApiShipmentTransactionStatus {
  return mapOrThrow(
    SHIPMENT_TRANSACTION_STATUS,
    status,
    'ShipmentTransactionStatus',
  );
}
export function mapShipmentTransactionStatusFromApi(
  apiStatus: ApiShipmentTransactionStatus,
): ShipmentTransactionStatus {
  return mapOrThrow(
    API_TO_SHIPMENT_TRANSACTION_STATUS,
    apiStatus,
    'ApiShipmentTransactionStatus',
  );
}
