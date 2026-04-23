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
} as const;
