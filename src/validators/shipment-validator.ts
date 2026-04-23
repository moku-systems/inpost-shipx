import { CreateShipmentInput } from '../types/shipment';
import { InPostValidationError } from '../utils/errors';

const PHONE_REGEX = /^\+?\d{9,15}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const POST_CODE_PL_REGEX = /^\d{2}-\d{3}$/;

export function validateCreateShipment(req: CreateShipmentInput): void {
  // Service is required
  if (!req.service) {
    throw new InPostValidationError('service is required', 'service');
  }

  // At least one parcel
  if (!req.parcels || req.parcels.length === 0) {
    throw new InPostValidationError(
      'At least one parcel is required',
      'parcels',
    );
  }

  // Validate each parcel has either template or dimensions
  req.parcels.forEach((parcel, idx) => {
    if (!parcel.template && !parcel.dimensions) {
      throw new InPostValidationError(
        `Parcel[${idx}] must specify either 'template' (small/medium/large) or 'dimensions'`,
        `parcels[${idx}]`,
      );
    }
    if (parcel.dimensions) {
      const { length, width, height, weight } = parcel.dimensions;
      if (length <= 0 || width <= 0 || height <= 0 || weight <= 0) {
        throw new InPostValidationError(
          `Parcel[${idx}] dimensions must be positive numbers`,
          `parcels[${idx}].dimensions`,
        );
      }
    }
  });

  // Validate receiver
  if (!req.receiver) {
    throw new InPostValidationError('receiver is required', 'receiver');
  }
  if (!req.receiver.email || !EMAIL_REGEX.test(req.receiver.email)) {
    throw new InPostValidationError(
      'Valid receiver email is required',
      'receiver.email',
      req.receiver.email,
    );
  }
  if (!req.receiver.phone || !PHONE_REGEX.test(req.receiver.phone)) {
    throw new InPostValidationError(
      'Valid receiver phone is required (9-15 digits, optional +)',
      'receiver.phone',
      req.receiver.phone,
    );
  }

  // Locker services require target_point (passed via custom_attributes or address not needed)
  // Courier services require address
  const isCourierService = req.service.includes('courier');
  if (isCourierService && !req.receiver.address) {
    throw new InPostValidationError(
      'receiver.address is required for courier services',
      'receiver.address',
    );
  }

  // Validate address post_code for PL
  if (req.receiver.address?.postalCode) {
    if (!POST_CODE_PL_REGEX.test(req.receiver.address.postalCode)) {
      throw new InPostValidationError(
        'Polish post code must match format XX-XXX',
        'receiver.address.postalCode',
        req.receiver.address.postalCode,
      );
    }
  }

  // Validate insurance
  if (req.insurance) {
    if (req.insurance.amount <= 0) {
      throw new InPostValidationError(
        'Insurance amount must be positive',
        'insurance.amount',
        req.insurance.amount,
      );
    }
  }

  // Validate COD
  if (req.cod) {
    if (req.cod.amount <= 0) {
      throw new InPostValidationError(
        'Cash on delivery amount must be positive',
        'cod.amount',
        req.cod.amount,
      );
    }
  }
}
