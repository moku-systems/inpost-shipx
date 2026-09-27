import { describe, expect, it } from '@jest/globals';
import { validateCreateShipment } from '../../../src/validators/shipment-validator';
import type { CreateShipmentInput } from '../../../src/types/shipment';
import { InPostValidationError } from '../../../src/utils/errors';

const baseShipmentInput: CreateShipmentInput = {
  service: 'LOCKER_STANDARD',
  parcels: [{ template: 'MEDIUM' }],
  receiver: {
    email: 'john@example.com',
    phone: '+48123456789',
  },
};

describe('validateCreateShipment', () => {
  it('allows locker service without receiver address', () => {
    expect(() => validateCreateShipment(baseShipmentInput)).not.toThrow();
  });

  it('requires receiver.address for courier services', () => {
    const courierInput: CreateShipmentInput = {
      ...baseShipmentInput,
      service: 'COURIER_STANDARD',
    };

    expect(() => validateCreateShipment(courierInput)).toThrow(
      InPostValidationError,
    );
    expect(() => validateCreateShipment(courierInput)).toThrow(
      'receiver.address is required for courier services',
    );
  });

  it('accepts courier service when receiver address is provided', () => {
    const courierInput: CreateShipmentInput = {
      ...baseShipmentInput,
      service: 'COURIER_STANDARD',
      receiver: {
        ...baseShipmentInput.receiver,
        address: {
          streetName: 'Miodowa',
          streetNumber: '1',
          city: 'Warszawa',
          postalCode: '00-001',
          countryCode: 'PL',
        },
      },
    };

    expect(() => validateCreateShipment(courierInput)).not.toThrow();
  });
});
