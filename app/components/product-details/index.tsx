import { FC } from "react";

type Dimensions = {
  width: number;
  height: number;
  depth: number;
};

export type ProductDetailsProps = {
  weight: number;
  dimensions: Dimensions;
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
};

const ProductDetails: FC<ProductDetailsProps> = ({
  weight,
  dimensions,
  warrantyInformation,
  shippingInformation,
  availabilityStatus,
  returnPolicy,
}) => (
  <div className="mb-8">
    <h3 className="text-lg font-semibold mb-2 text-gray-800">Product Details</h3>
    <ul className="text-gray-700 text-sm space-y-1">
      <li>
        <span className="font-medium">Weight:</span> {weight} kg
      </li>
      <li>
        <span className="font-medium">Dimensions:</span> {dimensions.width} x {dimensions.height} x {dimensions.depth} cm
      </li>
      <li>
        <span className="font-medium">Warranty:</span> {warrantyInformation}
      </li>
      <li>
        <span className="font-medium">Shipping:</span> {shippingInformation}
      </li>
      <li>
        <span className="font-medium">Availability:</span>{" "}
        <span className="text-green-600 font-semibold">{availabilityStatus}</span>
      </li>
      <li>
        <span className="font-medium">Return Policy:</span> {returnPolicy}
      </li>
    </ul>
  </div>
);

export {ProductDetails};
