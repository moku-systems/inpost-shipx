/**
 * InPost API ShipX endpoints
 */

export const ENDPOINTS = {
  shipments: {
    create: (organizationId: string) =>
      `/organizations/${organizationId}/shipments`,
    get: (shipmentId: number) => `/shipments/${shipmentId}`,
    list: (organizationId: string) =>
      `/organizations/${organizationId}/shipments`,
    label: (shipmentId: number) => `/shipments/${shipmentId}/label`,
    buyOffer: (shipmentId: number) => `/shipments/${shipmentId}/buy`,
  },
  points: {
    list: () => `/points`,
    get: (pointName: string) => `/points/${pointName}`,
  },
  tracking: {
    getServiceHistory: (trackingId: string) =>
      `/tracking/${trackingId}/service_history`,
    getTracking: (trackingId: string) => `/tracking/${trackingId}`,
  },
} as const;
