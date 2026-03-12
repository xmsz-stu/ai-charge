import { useState, useRef, useEffect } from 'react';
import { useCurrency } from './CurrencyContext';

export default function CurrencySelector() {
  const { currentCurrency, setCurrency, supportedCurrencies } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 border border-slate-200 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
      >
        <span className="material-symbols-outlined text-sm">payments</span>
        <span>{currentCurrency.code}</span>
        <span className="material-symbols-outlined text-xs transition-transform duration-200" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-[100] mt-1 w-48 border border-slate-200 bg-white py-1 shadow-lg dark:border-slate-800 dark:bg-slate-950">
          {supportedCurrencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => {
                setCurrency(currency.code);
                setIsOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-slate-50 dark:hover:bg-slate-900 ${
                currentCurrency.code === currency.code ? 'bg-primary/5 font-bold text-primary' : 'dark:text-slate-300'
              }`}
            >
              <span>{currency.label}</span>
              {currentCurrency.code === currency.code && (
                <span className="material-symbols-outlined text-sm">check</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
