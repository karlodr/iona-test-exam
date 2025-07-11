import { FC } from "react";
import type { Product } from "@/app/lib/types";
import { Badge } from "@/app/components/badge";
import { Rating } from "@/app/components/rating";
import { ProductDetails } from "@/app/components/product-details";
import { PriceDisplay } from "@/app/components/price-display";

type ProductInfoProps = Product;

export const ProductInfo: FC<ProductInfoProps> = ({
  title,
  price,
  category,
  rating,
  description,
  weight,
  dimensions,
  warrantyInformation,
  shippingInformation,
  availabilityStatus,
  returnPolicy,
  discountPercentage,
}) => (
  <div className="flex flex-col justify-between px-10 py-8 bg-white rounded-lg h-full">
    <div>
      <div>
        <Badge variant="primary" label={category} />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <PriceDisplay price={price} discountPercentage={discountPercentage} />
      </div>

      <Rating ratings={rating} />

      <p className="text-gray-700 mb-8 text-sm">{description}</p>

      <ProductDetails
        weight={weight}
        dimensions={dimensions}
        warrantyInformation={warrantyInformation}
        shippingInformation={shippingInformation}
        availabilityStatus={availabilityStatus}
        returnPolicy={returnPolicy}
      />
    </div>
    <div>
      <button className="btn btn-primary w-full py-3 text-lg font-semibold rounded-lg shadow hover:scale-105 transition-transform">
        Add to cart
      </button>
    </div>
  </div>
);
