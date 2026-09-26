import { InPostClient } from '../client';
import { ENDPOINTS } from '../utils/api';
import type { ApiTrackingServiceHistoryResponse } from '../types/api/tracking/tracking-service-history-response';
import type { ApiTrackingResponse } from '../types/api/tracking/tracking-history-response';
import { mapTrackingHistoryFromApi } from '../mappers/tracking/tracking-history';
import { mapTrackingServiceHistoryFromApi } from '../mappers/tracking/tracking-service-history';

export class TrackingService {
  constructor(private readonly client: InPostClient) {}

  /**
   * GET /v1/tracking/{trackingId}/service_history
   * Retrieves the service history for a specific shipment.
   * @param trackingId The tracking ID of the shipment.
   * @returns The service history for the specified shipment.
   */
  async serviceHistory(trackingId: string) {
    const endpoint = ENDPOINTS.tracking.getServiceHistory(trackingId);
    const apiResponse =
      await this.client.get<ApiTrackingServiceHistoryResponse>(endpoint);
    return mapTrackingServiceHistoryFromApi(apiResponse);
  }

  /**
   * GET /v1/tracking/{trackingId}
   * Retrieves the tracking events for a specific shipment.
   * @param trackingId The tracking ID of the shipment.
   * @returns The tracking events for the specified shipment.
   */
  async trackingEvents(trackingId: string) {
    const endpoint = ENDPOINTS.tracking.getTracking(trackingId);
    const apiResponse = await this.client.get<ApiTrackingResponse>(endpoint);
    return mapTrackingHistoryFromApi(apiResponse);
  }
}
