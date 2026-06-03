export const CountryCode = {
  PL: 'PL',
} as const;

export type CountryCode = (typeof CountryCode)[keyof typeof CountryCode];

export type Address = {
  streetName: string;
  streetNumber: string;
  apartmentNumber?: string;
  city: string;
  postalCode: string;
  voivodeship?: string;
  countryCode: CountryCode;
};
