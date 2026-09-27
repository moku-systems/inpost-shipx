# @moku-systems/inpost-shipx

Unofficial TypeScript SDK for the InPost ShipX API.

## Installation

```bash
npm install @moku-systems/inpost-shipx
```

## Requirements

- Node.js >= 22
- npm >= 11

## Quick start

```ts
import { InPostShipX } from '@moku-systems/inpost-shipx';

const inpost = new InPostShipX({
  accessToken: process.env.INPOST_ACCESS_TOKEN!,
  organizationId: process.env.INPOST_ORGANIZATION_ID!,
  environment: 'sandbox',
});

const shipment = await inpost.shipments.create({
  service: 'LOCKER_STANDARD',
  parcels: [{ template: 'MEDIUM' }],
  receiver: {
    email: 'john@example.com',
    phone: '+48123456789',
  },
});

const points = await inpost.points.list({ city: 'Gdańsk' });
const tracking = await inpost.tracking.trackingEvents(
  shipment.trackingNumber || 'your-tracking-number',
);
```

## Public API

### `shipments`

- `create(input)`
- `createShipmentWithLabel(input, format?)`
- `get(shipmentId)`
- `list(input?)`
- `buyOffer(shipmentId, input)`
- `getLabel(shipmentId, format?)`

### `points`

- `list(input?)`
- `get(pointName)`

### `tracking`

- `trackingEvents(trackingId)`
- `serviceHistory(trackingId)`

## Error types

- `InPostError`
- `InPostAPIError`
- `InPostValidationError`
- `InPostConfigError`
- `ShipmentNotConfirmedError`

## Development

```bash
npm run validate
npm run build
```