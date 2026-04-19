import { Address } from './address';

type ShipmentContact = {
  name?: string;
  companyName?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  address?: Address;
};

export type Sender = ShipmentContact;
export type Receiver = ShipmentContact;
