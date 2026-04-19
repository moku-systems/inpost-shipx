export const Currency = {
  PLN: 'PLN',
  EUR: 'EUR',
} as const;

export type Currency = (typeof Currency)[keyof typeof Currency];
