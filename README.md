# InPost ShipX SDK

<a href="https://badge.fury.io/js/%40moku-systems%2Finpost-shipx"><img src="https://badge.fury.io/js/%40moku-systems%2Finpost-shipx.svg" alt="npm version"></a>

An unofficial **InPost ShipX API client** SDK for integrating with the Polish shipment market.  
The SDK supports creating shipments, managing them, and downloading labels.

## 📦 Installation

Using npm:

```bash
npm install @moku-systems/inpost-shipx
```

Or yarn:

```bash
yarn add @moku-systems/inpost-shipx
```

## 🚀 Quick Start

### Initialize the client

```typescript
import { InPostShipX } from '@moku-systems/inpost-shipx';

const inpost = new InPostShipX({
  accessToken: 'your-access-token',
  organizationId: 'your-organization-id',
  environment: 'sandbox', // or 'production'
});
```

---

### 📦 Create a shipment

```typescript
const shipment = await inpost.shipments.create({
  service: 'LOCKER_STANDARD',
  receiver: {
    email: 'john.doe@example.com',
    phone: '+48123456789',
  },
  parcels: [{ template: 'MEDIUM' }],
  customAttributes: { target_point: 'KRA010' },
});

console.log(`Shipment ID: ${shipment.id}, status: ${shipment.status}`);
```

---

### 📑 Get a shipment label

```typescript
import { writeFileSync } from 'node:fs';

const labelBuffer = await inpost.shipments.getLabel(12345, 'PDF');
writeFileSync('shipment-12345.pdf', labelBuffer);

console.log('Label saved to "shipment-12345.pdf"');
```

---

### 🔍 Track a shipment

```typescript
const tracking = await inpost.tracking.trackingEvents('your-tracking-number');
console.log(tracking.status, tracking.trackingNumber);
```

---

## 🎛️ Configuration

`ShipXConfig` required to initialize the client:

- `accessToken` - Your InPost API access token.
- `organizationId` - The organization ID in InPost.
- `environment` - API environment: `sandbox` or `production`.
- `timeout` - Optional request timeout (ms).
- `maxRetries`, `retryDelay`, `retryableStatusCodes`, `retryableHttpMethods` - Optional retry behavior.

## 🧩 API surface

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

## 🧪 Tests

```bash
npm test
```

## 🛠️ Development checks

```bash
npm run validate
npm run build
```

## 📄 License

This project is licensed under the <a href="https://opensource.org/licenses/MIT">MIT License</a>.