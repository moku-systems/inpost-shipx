import type {
  ApiTrackingDetail,
  ApiTrackingResponse,
} from '../../types/api/tracking/tracking-history-response';
import type { TrackingEvent, TrackingHistory } from '../../types';
import { mapAddressLineFromApi } from '../common';
import { mapTrackingParcelSizeFromApi } from '../common/common';
import { mapPointTypeFromApi } from '../point';
import { mapServiceFromApi } from '../service';
import { mapStatusFromApi } from '../status';

// ═══════════════════════════════════════════════════════════════
//  API RESPONSE  →  OUTPUT
// ═══════════════════════════════════════════════════════════════

export function mapTrackingHistoryFromApi(
  apiResponse: ApiTrackingResponse,
): TrackingHistory {
  return {
    trackingNumber: apiResponse.tracking_number,
    service: mapServiceFromApi(apiResponse.service),
    currentStatus: mapStatusFromApi(apiResponse.status),
    parcelDetails: {
      parcelSize: mapTrackingParcelSizeFromApi(
        apiResponse.custom_attributes!.size,
      ),
      lockerDetails: {
        name: apiResponse.custom_attributes?.target_machine_detail.name,
        locationDescription:
          apiResponse.custom_attributes?.target_machine_detail
            .location_description,
        geoLocation:
          apiResponse.custom_attributes?.target_machine_detail.location,
        addressLine: mapAddressLineFromApi(
          apiResponse.custom_attributes?.target_machine_detail.address,
        ),
        type: mapPointTypeFromApi(
          apiResponse.custom_attributes?.target_machine_detail.type[0] ??
            'parcel_locker',
        ),
      },
    },
    trackingEvents: apiResponse.tracking_details.map(
      (event: ApiTrackingDetail): TrackingEvent => ({
        status: mapStatusFromApi(event.status),
        timestamp: event.datetime,
      }),
    ),
  };
}
