import { useCurrency } from '../CurrencyContext';
import { convertPrice } from '../../lib/currency';

interface PriceProps {
  amount: number | string;
  className?: string;
  showCode?: boolean;
  fromCurrency?: string;
}

export default function Price({ amount, className = '', showCode = false, fromCurrency = 'USD' }: PriceProps) {
  const { currentCurrency } = useCurrency();
  
  const price = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(price)) {
    return <span className={className}>-</span>;
  }

  const converted = convertPrice(price, currentCurrency, fromCurrency);
  
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currentCurrency.code,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(converted);

  return (
    <span className={className}>
      {formatted}
      {showCode && <span className="ml-1 text-[10px] opacity-70">{currentCurrency.code}</span>}
    </span>
  );
}
