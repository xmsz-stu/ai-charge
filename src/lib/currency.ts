
export interface Currency {
  code: string;
  symbol: string;
  rate: number; // Rate relative to USD (1 USD = rate * Currency)
  label: string;
}

export const SUPPORTED_CURRENCIES: Currency[] = [
  {
    code: 'USD',
    symbol: '$',
    rate: 1,
    label: 'USD - US Dollar',
  },
  {
    code: 'CNY',
    symbol: '¥',
    rate: 7.23, // Example rate, should be updated or fetched dynamically if possible
    label: 'CNY - Chinese Yuan',
  },
  {
    code: 'EUR',
    symbol: '€',
    rate: 0.92,
    label: 'EUR - Euro',
  },
  {
    code: 'GBP',
    symbol: '£',
    rate: 0.78,
    label: 'GBP - British Pound',
  },
];

export const DEFAULT_CURRENCY = SUPPORTED_CURRENCIES[0];

export function convertPrice(usdPrice: number, targetCurrency: Currency): number {
  return usdPrice * targetCurrency.rate;
}

export function formatPrice(price: number, currency: Currency): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}
