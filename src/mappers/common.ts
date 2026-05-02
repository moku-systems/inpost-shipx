import { ApiCurrency } from '../types/api/shipment/shipment-currency';
import { ApiShipmentLabelFormat } from '../types/api/shipment/shipment-label';
import { ApiParcelSize } from '../types/api/shipment/shipment-parcel-size';
import { Currency, ParcelSize, ShipmentLabelFormat } from '../types/shipment';

const PARCEL_SIZE_TO_API = new Map<ParcelSize, ApiParcelSize>([
  [ParcelSize.SMALL, 'small'],
  [ParcelSize.MEDIUM, 'medium'],
  [ParcelSize.LARGE, 'large'],
]);

const CURRENCY_TO_API = new Map<Currency, ApiCurrency>([
  [Currency.PLN, 'PLN'],
  [Currency.EUR, 'EUR'],
]);

const LABEL_FORMAT_TO_API = new Map<
  ShipmentLabelFormat,
  ApiShipmentLabelFormat
>([
  [ShipmentLabelFormat.PDF, 'pdf'],
  [ShipmentLabelFormat.ZPL, 'zpl'],
  [ShipmentLabelFormat.EPL, 'epl'],
]);

const API_TO_PARCEL_SIZE = new Map<ApiParcelSize, ParcelSize>(
  [...PARCEL_SIZE_TO_API.entries()].map(([k, v]) => [v, k]),
);

const API_TO_CURRENCY = new Map<ApiCurrency, Currency>(
  [...CURRENCY_TO_API.entries()].map(([k, v]) => [v, k]),
);

export function mapOrThrow<TFrom, TTo>(
  map: Map<TFrom, TTo>,
  value: TFrom,
  label: string,
): TTo {
  const mapped = map.get(value);
  if (mapped === undefined) {
    throw new Error(`Unknown ${label}: ${value}`);
  }
  return mapped;
}

// ═══════════════════════════════════════════════════════════════
//  Public API
// ═══════════════════════════════════════════════════════════════

export function mapParcelSizeToApi(parcelSize: ParcelSize): ApiParcelSize {
  return mapOrThrow(PARCEL_SIZE_TO_API, parcelSize, 'ParcelSize');
}
export function mapParcelSizeFromApi(apiParcelSize: ApiParcelSize): ParcelSize {
  return mapOrThrow(API_TO_PARCEL_SIZE, apiParcelSize, 'ApiParcelSize');
}

export function mapLabelFormatToApi(
  labelFormat: ShipmentLabelFormat,
): ApiShipmentLabelFormat {
  return mapOrThrow(LABEL_FORMAT_TO_API, labelFormat, 'ShipmentLabelFormat');
}

export function mapCurrencyToApi(currency: Currency): ApiCurrency {
  return mapOrThrow(CURRENCY_TO_API, currency, 'Currency');
}
export function mapCurrencyFromApi(apiCurrency: ApiCurrency): Currency {
  return mapOrThrow(API_TO_CURRENCY, apiCurrency, 'ApiCurrency');
}
