import type { ApiTrackingServiceHistoryResponse } from '../../types/api/tracking/tracking-service-history-response';
import type { TrackingServiceHistory } from '../../types';
import { mapServiceFromApi } from '../service';

export function mapTrackingServiceHistoryFromApi(
  apiResponse: ApiTrackingServiceHistoryResponse,
): TrackingServiceHistory {
  return {
    lastService: mapServiceFromApi(apiResponse.service_history.last_service),
    shipmentId: apiResponse.id,
    updatedAt: apiResponse.service_history.updated_at,
  };
}
