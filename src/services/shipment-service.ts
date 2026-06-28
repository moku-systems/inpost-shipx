import type { InPostClient } from '../client/inpost-client';
import { ENDPOINTS } from '../utils/api/endpoints';

import type {
  CreateShipmentInput,
  Shipment,
  ShipmentListResult,
  GetShipmentListInput,
  ShipmentLabelFormat,
  BuyShipmentOfferInput,
} from '../types/shipment';

// Mappery
import {
  mapCreateShipmentToApi,
  mapBuyOfferToApi,
  mapListParamsToApi,
  mapShipmentFromApi,
  mapShipmentListFromApi,
} from '../mappers/shipment/shipment';
import { mapLabelFormatToApi } from '../mappers/shipment/common';
import { validateCreateShipment } from '../validators/shipment-validator';
import {
  ApiShipmentListResponse,
  ApiShipmentResponse,
} from '../types/api/shipment/create-shipment-response';

export class ShipmentService {
  constructor(
    private readonly client: InPostClient,
    private readonly organizationId: string,
  ) {}

  /**
   * Create a new shipment for the organization
   * POST /v1/organizations/:organization_id/shipments
   */
  async create(input: CreateShipmentInput): Promise<Shipment> {
    validateCreateShipment(input);

    const endpoint = ENDPOINTS.shipments.create(this.organizationId);
    const apiRequest = mapCreateShipmentToApi(input);
    const apiResponse = await this.client.post<ApiShipmentResponse>(
      endpoint,
      apiRequest,
    );

    return mapShipmentFromApi(apiResponse);
  }

  /**
   * Get shipment details
   * GET /v1/shipments/:id
   */
  async get(shipmentId: number): Promise<Shipment> {
    const endpoint = ENDPOINTS.shipments.get(shipmentId);
    const apiResponse = await this.client.get<ApiShipmentResponse>(endpoint);

    return mapShipmentFromApi(apiResponse);
  }

  /**
   * Get a list of shipments for the organization
   * GET /v1/organizations/:organization_id/shipments
   */
  async list(input?: GetShipmentListInput): Promise<ShipmentListResult> {
    const endpoint = ENDPOINTS.shipments.list(this.organizationId);
    const params = input ? mapListParamsToApi(input) : undefined;
    const apiResponse = await this.client.get<ApiShipmentListResponse>(
      endpoint,
      { params },
    );

    return mapShipmentListFromApi(apiResponse);
  }

  /**
   * Buy a shipment offer
   * POST /v1/shipments/:id/buy
   */
  async buyOffer(
    shipmentId: number,
    input: BuyShipmentOfferInput,
  ): Promise<Shipment> {
    const endpoint = ENDPOINTS.shipments.buyOffer(shipmentId);
    const apiRequest = mapBuyOfferToApi(input);
    const apiResponse = await this.client.post<ApiShipmentResponse>(
      endpoint,
      apiRequest,
    );

    return mapShipmentFromApi(apiResponse);
  }

  /**
   * Get shipment label
   * GET /v1/shipments/:id/label
   */
  async getLabel(
    shipmentId: number,
    format: ShipmentLabelFormat = 'PDF',
  ): Promise<Buffer> {
    const endpoint = ENDPOINTS.shipments.label(shipmentId);
    const response = await this.client.get<ArrayBuffer>(endpoint, {
      params: { format: mapLabelFormatToApi(format) },
      responseType: 'arraybuffer',
    });

    return Buffer.from(response);
  }
}
