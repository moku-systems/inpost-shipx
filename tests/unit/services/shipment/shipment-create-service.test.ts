import { jest, describe, expect, it, beforeEach } from '@jest/globals';
import { ShipmentService } from '../../../../src/services/shipment-service';
import type { CreateShipmentInput } from '../../../../src/types/shipment';
import { ShipmentOfferStatus } from '../../../../src/types/status/offer-status';
import { ShipmentTransactionStatus } from '../../../../src/types/status/shipment-transaction-status';
import { ShipmentNotConfirmedError } from '../../../../src/utils/errors';
import * as retryStrategy from '../../../../src/client/retry-strategy';

jest.mock('../../../../src/client/retry-strategy', () => ({
  ...(jest.requireActual('../../../../src/client/retry-strategy') as object),
  sleep: jest.fn<() => Promise<void>>().mockResolvedValue(undefined),
}));

const mockedSleep = retryStrategy.sleep as jest.MockedFunction<
  typeof retryStrategy.sleep
>;

const mockClient = {
  get: jest.fn(),
  post: jest.fn(),
  getRaw: jest.fn(),
};

const mockOrgId = 'org-123';

describe('ShipmentService', () => {
  let service: ShipmentService;

  const createShipmentResponse = (
    status: string,
    trackingNumber: string | null = null,
  ) => ({
    id: 1,
    status,
    tracking_number: trackingNumber,
    service: 'inpost_locker_standard',
    reference: null,
    comments: null,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-01-01T00:00:00Z',
    receiver: { email: 'jan@test.pl', phone: '500600700' },
    sender: { email: '', phone: '' },
    parcels: [],
    insurance: null,
    cod: null,
    offers: [],
    selected_offer: null,
    transactions: [],
    custom_attributes: null,
    external_customer_id: null,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockedSleep.mockClear();
    service = new ShipmentService(mockClient as any, mockOrgId);
  });

  it('should create a locker shipment', async () => {
    const request: CreateShipmentInput = {
      service: 'LOCKER_STANDARD',
      receiver: { email: 'jan@test.pl', phone: '500600700' },
      parcels: [{ template: 'SMALL' }],
      customAttributes: { target_point: 'KRA010' },
    };

    mockClient.post.mockResolvedValue({
      id: 1,
      status: 'created',
      tracking_number: null,
      service: 'inpost_locker_standard',
      reference: null,
      comments: null,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
      receiver: { email: 'jan@test.pl', phone: '500600700' },
      sender: { email: '', phone: '' },
      parcels: [],
      insurance: null,
      cod: null,
      offers: [
        {
          id: 'offer-1',
          carrier: { id: 'inpost', name: 'InPost' },
          service: 'inpost_locker_standard',
          status: 'available',
          expires_at: '2026-01-02T00:00:00Z',
          rate: null,
          currency: 'PLN',
        },
      ],
      selected_offer: {
        id: 'offer-1',
        carrier: { id: 'inpost', name: 'InPost' },
        service: 'inpost_locker_standard',
        status: 'selected',
        expires_at: '2026-01-02T00:00:00Z',
        rate: 12.5,
        currency: 'PLN',
      },
      transactions: [
        {
          id: 11,
          status: 'success',
          created_at: '2026-01-01T00:00:01Z',
          updated_at: '2026-01-01T00:00:02Z',
          offer_id: 123,
          details: {
            status: 200,
            error: '',
            message: 'Offer purchased',
            details: { retries: 0, async: false },
          },
        },
      ],
      custom_attributes: { target_point: 'KRA010' },
      external_customer_id: null,
    } as never);
    const result = await service.create(request);

    expect(mockClient.post).toHaveBeenCalledWith(
      '/organizations/org-123/shipments',
      expect.objectContaining({ service: 'inpost_locker_standard' }),
    );
    expect(result.id).toBe(1);
    expect(result.offers).toEqual([
      {
        id: 'offer-1',
        carrier: { id: 'inpost', name: 'InPost' },
        service: 'LOCKER_STANDARD',
        status: ShipmentOfferStatus.AVAILABLE,
        expiresAt: '2026-01-02T00:00:00Z',
        rate: null,
        currency: 'PLN',
      },
    ]);
    expect(result.selectedOffer).toEqual({
      id: 'offer-1',
      carrier: { id: 'inpost', name: 'InPost' },
      service: 'LOCKER_STANDARD',
      status: ShipmentOfferStatus.SELECTED,
      expiresAt: '2026-01-02T00:00:00Z',
      rate: 12.5,
      currency: 'PLN',
    });
    expect(result.transactions).toEqual([
      {
        id: 11,
        status: ShipmentTransactionStatus.SUCCESS,
        createdAt: '2026-01-01T00:00:01Z',
        updatedAt: '2026-01-01T00:00:02Z',
        offerId: 123,
        details: {
          status: 200,
          error: '',
          message: 'Offer purchased',
          details: { retries: 0, async: false },
        },
      },
    ]);
  });

  it('should throw validation error when parcels are empty', async () => {
    const request = {
      service: 'LOCKER_STANDARD',
      receiver: { email: 'jan@test.pl', phone: '500600700' },
      parcels: [],
    } as any as CreateShipmentInput;

    await expect(service.create(request)).rejects.toThrow(
      'At least one parcel is required',
    );
  });

  it('should keep transactions as an empty array when API returns []', async () => {
    const request: CreateShipmentInput = {
      service: 'LOCKER_STANDARD',
      receiver: { email: 'jan@test.pl', phone: '500600700' },
      parcels: [{ template: 'SMALL' }],
    };

    mockClient.post.mockResolvedValue({
      id: 2,
      status: 'created',
      tracking_number: null,
      service: 'inpost_locker_standard',
      reference: null,
      comments: null,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
      receiver: { email: 'jan@test.pl', phone: '500600700' },
      sender: { email: '', phone: '' },
      parcels: [],
      insurance: null,
      cod: null,
      offers: [],
      selected_offer: null,
      transactions: [],
      custom_attributes: null,
      external_customer_id: null,
    } as never);

    const result = await service.create(request);

    expect(result.transactions).toEqual([]);
  });

  it('should map transactions to null when API returns null', async () => {
    const request: CreateShipmentInput = {
      service: 'LOCKER_STANDARD',
      receiver: { email: 'jan@test.pl', phone: '500600700' },
      parcels: [{ template: 'SMALL' }],
    };

    mockClient.post.mockResolvedValue({
      id: 3,
      status: 'created',
      tracking_number: null,
      service: 'inpost_locker_standard',
      reference: null,
      comments: null,
      created_at: '2026-01-01T00:00:00Z',
      updated_at: '2026-01-01T00:00:00Z',
      receiver: { email: 'jan@test.pl', phone: '500600700' },
      sender: { email: '', phone: '' },
      parcels: [],
      insurance: null,
      cod: null,
      offers: [],
      selected_offer: null,
      transactions: null,
      custom_attributes: null,
      external_customer_id: null,
    } as never);

    const result = await service.create(request);

    expect(result.transactions).toBeNull();
  });

  it('should fetch label as PDF buffer', async () => {
    const pdfBuffer = Buffer.from('fake-pdf');
    mockClient.get.mockResolvedValue(pdfBuffer as never);

    const result = await service.getLabel(123, 'PDF');
    expect(mockClient.get).toHaveBeenCalledWith(
      '/shipments/123/label',
      expect.objectContaining({ params: { format: 'pdf' } }),
    );
    expect(Buffer.isBuffer(result)).toBe(true);
  });

  it('should retry shipment status checks and fetch label once confirmed', async () => {
    service = new ShipmentService(mockClient as any, mockOrgId, {
      maxStatusChecks: 5,
      statusCheckRetryDelay: 100,
    });

    const request: CreateShipmentInput = {
      service: 'LOCKER_STANDARD',
      receiver: { email: 'jan@test.pl', phone: '500600700' },
      parcels: [{ template: 'SMALL' }],
    };

    const shipmentStatuses = [
      createShipmentResponse('created'),
      createShipmentResponse('offers_prepared'),
      createShipmentResponse('confirmed', 'TRACK123'),
    ];

    const labelBuffer = Buffer.from('label-bytes');

    mockClient.post.mockResolvedValue(
      createShipmentResponse('created') as never,
    );
    mockClient.get.mockImplementation((url: string) => {
      if (url === '/shipments/1') {
        return Promise.resolve(shipmentStatuses.shift() as never);
      }

      if (url === '/shipments/1/label') {
        return Promise.resolve(labelBuffer as never);
      }

      return Promise.reject(new Error(`Unexpected URL: ${url}`));
    });

    const result = await service.createShipmentWithLabel(request, 'PDF');

    expect(mockedSleep).toHaveBeenCalledTimes(2);
    expect(mockedSleep).toHaveBeenNthCalledWith(1, 100);
    expect(mockedSleep).toHaveBeenNthCalledWith(2, 100);
    expect(mockClient.get).toHaveBeenCalledTimes(4);
    expect(result.status).toBe('CONFIRMED');
    expect(result.trackingNumber).toBe('TRACK123');
    expect(result.label.equals(labelBuffer)).toBe(true);
  });

  it('should throw when shipment is not confirmed after max checks', async () => {
    service = new ShipmentService(mockClient as any, mockOrgId, {
      maxStatusChecks: 3,
      statusCheckRetryDelay: 50,
    });

    const request: CreateShipmentInput = {
      service: 'LOCKER_STANDARD',
      receiver: { email: 'jan@test.pl', phone: '500600700' },
      parcels: [{ template: 'SMALL' }],
    };

    mockClient.post.mockResolvedValue(
      createShipmentResponse('created') as never,
    );
    mockClient.get.mockImplementation((url: string) => {
      if (url === '/shipments/1') {
        return Promise.resolve(createShipmentResponse('created') as never);
      }

      if (url === '/shipments/1/label') {
        return Promise.resolve(Buffer.from('label') as never);
      }

      return Promise.reject(new Error(`Unexpected URL: ${url}`));
    });

    await expect(service.createShipmentWithLabel(request)).rejects.toThrow(
      ShipmentNotConfirmedError,
    );

    expect(mockedSleep).toHaveBeenCalledTimes(2);
    expect(mockClient.get).toHaveBeenCalledTimes(3);
  });
});
