import { AddressLine } from '../../types';
import { ApiAddressLine } from '../../types/api/common/address';

export function mapAddressLineFromApi(
  address: ApiAddressLine | undefined,
): AddressLine | undefined {
  if (!address) {
    return undefined;
  }

  return {
    streetLine: address.line1,
    cityWithPostalCode: address.line2,
  };
}
