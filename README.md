# InPost ShipX SDK

[![npm version](https://badge.fury.io/js/%40moku-systems%2Finpost-shipx.svg)](https://badge.fury.io/js/%40moku-systems%2Finpost-shipx)

An unofficial **InPost ShipX API client** SDK for integrating with the Polish shipment market. The SDK supports creating shipments, managing them, and downloading labels.

## 📦 Installation (coming soon)

Using npm:

```bash
npm install @moku-systems/inpost-shipx
```

Or yarn:

```bash
yarn add @moku-systems/inpost-shipx
```

## 🚀 Quick Start

### Initialize the Client

Create an `InPostShipX` instance with your configuration:

```typescript
import { InPostShipX } from '@moku-systems/inpost-shipx';

const inpost = new InPostShipX({
  accessToken: 'your-access-token',
  organizationId: 'your-organization-id',
  environment: 'sandbox', // or 'production'
});
```

---

### 📦 Create a Shipment

To create a shipment:

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

### 📑 Get a Shipment Label

Retrieve a shipment label in PDF format:

```typescript
const labelBuffer = await inpost.shipments.getLabel(12345, 'PDF');
require('fs').writeFileSync('shipment-12345.pdf', labelBuffer);
console.log('Label saved to "shipment-12345.pdf"');
```

---

## 🎛️ Configuration

The **ShipXConfig** required to initialize the client:

- `accessToken`: Your InPost API access token.
- `organizationId`: The organization ID in InPost.
- `environment`: Defines the environment (`sandbox` or `production`).

---

## 🧪 Tests

Run the unit tests using:

```bash
npm test
```

---

## 📄 License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
