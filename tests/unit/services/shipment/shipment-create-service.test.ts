import { jest, describe, expect, it, beforeEach } from '@jest/globals';
import { ShipmentService } from '../../../../src/services/shipment-service';
import type { CreateShipmentInput } from '../../../../src/types/shipment';

const mockClient = {
  get: jest.fn(),
  post: jest.fn(),
  getRaw: jest.fn(),
};

const mockOrgId = 'org-123';

describe('ShipmentService', () => {
  let service: ShipmentService;

  beforeEach(() => {
    jest.clearAllMocks();
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
      offers: [],
      selected_offer: null,
      custom_attributes: { target_point: 'KRA010' },
      external_customer_id: null,
    } as never);
    const result = await service.create(request);

    expect(mockClient.post).toHaveBeenCalledWith(
      '/organizations/org-123/shipments',
      expect.objectContaining({ service: 'inpost_locker_standard' }),
    );
    expect(result.id).toBe(1);
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
});
