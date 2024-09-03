import { formatPrice } from "@/lib/format";

interface PriceTagProps {
  price: Number;
  className?: string;
}

const PriceTag = ({ price, className }: PriceTagProps) => {
  return <span className={`badge ${className}`}>{formatPrice(price)}</span>;
};

export default PriceTag;
