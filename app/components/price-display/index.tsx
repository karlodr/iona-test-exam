import { FC } from "react";

type PriceDisplayProps = {
  price: number;
  discountPercentage: number;
};

export const PriceDisplay: FC<PriceDisplayProps> = ({
  price,
  discountPercentage,
}) => {
  if (typeof price !== "number" || typeof discountPercentage !== "number")
    return null;

  const discountAmount = price * (discountPercentage / 100);
  const discountedPrice = price - discountAmount;

  return (
    <div className="flex items-baseline gap-2 mb-1">
      <span className="text-lg font-bold text-green-600">
        ${discountedPrice.toFixed(2)}
      </span>
      {discountPercentage > 0 && (
        <>
          <span className="line-through text-gray-400 text-base">
            ${price.toFixed(2)}
          </span>
          <span className="bg-red-100 text-red-600 text-xs font-semibold px-2 py-0.5 rounded">
            -{discountPercentage.toFixed(0)}%
          </span>
        </>
      )}
    </div>
  );
};
