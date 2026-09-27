import type { InPostClient } from '../client/inpost-client';
import { sleep } from '../client/retry-strategy';
import { ENDPOINTS } from '../utils/api/endpoints';
import { SHIPMENT_CONFIG } from '../utils/config/defaults';

import type {
  CreateShipmentInput,
  Shipment,
  ShipmentListResult,
  GetShipmentListInput,
  ShipmentLabelFormat,
  BuyShipmentOfferInput,
  CreateShipmentWithLabel,
} from '../types/shipment';

// Mappery
import {
  mapCreateShipmentToApi,
  mapBuyOfferToApi,
  mapListParamsToApi,
  mapShipmentFromApi,
  mapShipmentListFromApi,
  mapCreateShipmentWithLabel,
} from '../mappers/shipment/shipment';
import { mapLabelFormatToApi } from '../mappers/common/common';
import { validateCreateShipment } from '../validators/shipment-validator';
import { ShipmentNotConfirmedError } from '../utils/errors';
import {
  ApiShipmentListResponse,
  ApiShipmentResponse,
} from '../types/api/shipment/create-shipment-response';

export class ShipmentService {
  private readonly maxStatusChecks: number;
  private readonly statusCheckRetryDelay: number;

  constructor(
    private readonly client: InPostClient,
    private readonly organizationId: string,
    options?: {
      /**
       * Used to determine how many times the service will poll the shipment status before throwing an error.
       * Check till the shipment is confirmed or the maximum number of attempts is reached.
       * @default 5
       */
      maxStatusChecks?: number;
      /**
       * Delay between shipment status checks in milliseconds.
       * This delay is applied between each status check attempt till the shipment is confirmed or the maximum number of attempts is reached.
       * @default 500
       */
      statusCheckRetryDelay?: number;
    },
  ) {
    this.maxStatusChecks = Math.max(
      1,
      options?.maxStatusChecks ?? SHIPMENT_CONFIG.maxStatusChecks,
    );
    this.statusCheckRetryDelay = Math.max(
      0,
      options?.statusCheckRetryDelay ?? SHIPMENT_CONFIG.statusCheckRetryDelay,
    );
  }

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

  async createShipmentWithLabel(
    input: CreateShipmentInput,
    format: ShipmentLabelFormat = 'PDF',
  ): Promise<CreateShipmentWithLabel> {
    const shipment = await this.create(input);
    const shipmentStatus = await this.waitForConfirmedStatus(shipment.id);

    const label = await this.getLabel(shipment.id, format);
    return mapCreateShipmentWithLabel(shipmentStatus, label);
  }

  private async waitForConfirmedStatus(shipmentId: number): Promise<Shipment> {
    for (let attempt = 1; attempt <= this.maxStatusChecks; attempt++) {
      const shipment = await this.get(shipmentId);
      if (shipment.status === 'CONFIRMED') {
        return shipment;
      }

      if (attempt < this.maxStatusChecks) {
        await sleep(this.statusCheckRetryDelay);
      }
    }

    throw new ShipmentNotConfirmedError(shipmentId, this.maxStatusChecks);
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
