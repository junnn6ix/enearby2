import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {
  minPrice?: number | null;
  maxPrice?: number | null;
  onMinPriceChange: (value: number | null) => void;
  onMaxPriceChange: (value: number | null) => void;
}

export const formatAsCurrency = (value: string) => {
  const numericValue = value.replace(/[^0-9]/g, "");

  const parts = numericValue.split(".");

  const formattedValue =
    parts[0] + (parts.length > 1 ? "." + parts[1]?.slice(0, 2) : "");

  if (!formattedValue) return "";

  const numberValue = parseFloat(formattedValue);
  if (isNaN(numberValue)) return "";

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(numberValue);
};

const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: Props) => {
  const handleMinPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Get the raw input value and extract only numeric values
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    onMinPriceChange(numericValue ? parseInt(numericValue, 10) : null);
  };

  const handleMaxPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Get the raw input value and extract only numeric values
    const numericValue = e.target.value.replace(/[^0-9]/g, "");
    onMaxPriceChange(numericValue ? parseInt(numericValue, 10) : null);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Min Price</Label>
        <Input
          type="text"
          placeholder="$0"
          value={minPrice ? formatAsCurrency(String(minPrice)) : ""}
          onChange={handleMinPriceChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Max Price</Label>
        <Input
          type="text"
          placeholder="&infin;"
          value={maxPrice ? formatAsCurrency(String(maxPrice)) : ""}
          onChange={handleMaxPriceChange}
        />
      </div>
    </div>
  );
};

export default PriceFilter;
