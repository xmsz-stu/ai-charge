import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { Currency } from '../lib/currency';
import { DEFAULT_CURRENCY, SUPPORTED_CURRENCIES } from '../lib/currency';

interface CurrencyContextType {
  currentCurrency: Currency;
  setCurrency: (code: string) => void;
  supportedCurrencies: Currency[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currentCurrency, setCurrentCurrency] = useState<Currency>(DEFAULT_CURRENCY);

  useEffect(() => {
    const savedCurrencyCode = localStorage.getItem('selected_currency');
    if (savedCurrencyCode) {
      const saved = SUPPORTED_CURRENCIES.find(c => c.code === savedCurrencyCode);
      if (saved) {
        setCurrentCurrency(saved);
      }
    }
  }, []);

  const setCurrency = (code: string) => {
    const currency = SUPPORTED_CURRENCIES.find(c => c.code === code);
    if (currency) {
      setCurrentCurrency(currency);
      localStorage.setItem('selected_currency', code);
    }
  };

  return (
    <CurrencyContext.Provider value={{ currentCurrency, setCurrency, supportedCurrencies: SUPPORTED_CURRENCIES }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
