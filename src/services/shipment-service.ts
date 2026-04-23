import type { InPostClient } from '../client/InPostClient';
import type { AuthManager } from '../auth/AuthManager';
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
} from '../mappers/shipment';
import { mapLabelFormatToApi } from '../mappers/common';
import { validateCreateShipment } from '../validators/shipment-validator';
import {
  ApiShipmentListResponse,
  ApiShipmentResponse,
} from '../types/api/shipment/create-shipment-response';

export class ShipmentService {
  constructor(
    private readonly client: InPostClient,
    private readonly authManager: AuthManager,
  ) {}

  /**
   * Utwórz nową przesyłkę
   * POST /v1/organizations/:organization_id/shipments
   */
  async create(input: CreateShipmentInput): Promise<Shipment> {
    validateCreateShipment(input);

    const orgId = this.authManager.getOrganizationId();
    const endpoint = ENDPOINTS.shipments.create(orgId);
    const apiRequest = mapCreateShipmentToApi(input);
    const apiResponse = await this.client.post<ApiShipmentResponse>(
      endpoint,
      apiRequest,
    );

    return mapShipmentFromApi(apiResponse);
  }

  /**
   * Pobierz szczegóły przesyłki
   * GET /v1/shipments/:id
   */
  async get(shipmentId: number): Promise<Shipment> {
    const endpoint = ENDPOINTS.shipments.get(shipmentId);
    const apiResponse = await this.client.get<ApiShipmentResponse>(endpoint);

    return mapShipmentFromApi(apiResponse);
  }

  /**
   * Pobierz listę przesyłek organizacji
   * GET /v1/organizations/:organization_id/shipments
   */
  async list(input?: GetShipmentListInput): Promise<ShipmentListResult> {
    const orgId = this.authManager.getOrganizationId();
    const endpoint = ENDPOINTS.shipments.list(orgId);
    const params = input ? mapListParamsToApi(input) : undefined;
    const apiResponse = await this.client.get<ApiShipmentListResponse>(
      endpoint,
      { params },
    );

    return mapShipmentListFromApi(apiResponse);
  }

  /**
   * Kup ofertę przesyłki
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
   * Pobierz etykietę przesyłki
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
