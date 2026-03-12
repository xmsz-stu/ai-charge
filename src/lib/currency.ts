
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

export function convertPrice(price: number, targetCurrency: Currency, sourceCurrencyCode: string = 'USD'): number {
  if (sourceCurrencyCode === targetCurrency.code) return price;
  
  const sourceCurrency = SUPPORTED_CURRENCIES.find(c => c.code === sourceCurrencyCode);
  if (!sourceCurrency) return price; // Fallback if source currency unknown
  
  // Convert source to USD first
  const usdPrice = price / sourceCurrency.rate;
  
  // Then convert USD to target
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

/**
 * Parses a billing cycle string (e.g. "Monthly", "1 Year", "3 Months") 
 * and returns the number of months.
 */
export function getMonthsFromCycle(cycle: string): number {
  if (!cycle) return 1;
  const c = cycle.toLowerCase();
  if (c.includes('1 month') || c === 'monthly' || c === 'month') return 1;
  if (c.includes('3 months')) return 3;
  if (c.includes('6 months')) return 6;
  if (c.includes('1 year') || c === 'yearly' || c === 'annual') return 12;
  
  // Regex fallbacks for things like "2 Months" or "2 Years"
  const monthMatch = c.match(/(\d+)\s*month/);
  if (monthMatch) return parseInt(monthMatch[1]);
  
  const yearMatch = c.match(/(\d+)\s*year/);
  if (yearMatch) return parseInt(yearMatch[1]) * 12;
  
  return 1;
}
