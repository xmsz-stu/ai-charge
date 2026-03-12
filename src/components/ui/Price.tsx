import { useCurrency } from '../CurrencyContext';
import { convertPrice } from '../../lib/currency';

interface PriceProps {
  usdPrice: number | string;
  className?: string;
  showCode?: boolean;
}

export default function Price({ usdPrice, className = '', showCode = false }: PriceProps) {
  const { currentCurrency } = useCurrency();
  
  const price = typeof usdPrice === 'string' ? parseFloat(usdPrice) : usdPrice;
  
  if (isNaN(price)) {
    return <span className={className}>-</span>;
  }

  const converted = convertPrice(price, currentCurrency);
  
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
