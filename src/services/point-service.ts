import type { InPostClient } from '../client/inpost-client';
import { ENDPOINTS } from '../utils/api/endpoints';
import type { ApiListResponse } from '../types/api/common';
import type { ApiPointResponse } from '../types/api/points/point-response';
import type {
  GetPointListInput,
  PointListResult,
  PointResponse,
} from '../types/points';

import {
  mapPointFromApi,
  mapPointListFromApi,
  mapPointListParamsToApi,
} from '../mappers/point/point';

export class PointService {
  constructor(private readonly client: InPostClient) {}

  /**
   * Pobierz listę punktów
   * GET /v1/points
   */
  async list(input?: GetPointListInput): Promise<PointListResult> {
    const endpoint = ENDPOINTS.points.list();
    const params = input ? mapPointListParamsToApi(input) : undefined;
    const apiResponse = await this.client.getFromGateway<
      ApiListResponse<ApiPointResponse>
    >(endpoint, { params });

    return mapPointListFromApi(apiResponse);
  }

  /**
   * Pobierz szczegóły punktu
   * GET /v1/points/:name
   */
  async get(pointName: string): Promise<PointResponse> {
    const endpoint = ENDPOINTS.points.get(pointName);
    const apiResponse =
      await this.client.getFromGateway<ApiPointResponse>(endpoint);

    return mapPointFromApi(apiResponse);
  }
}
