
// For product listing page
export type Product = {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
  category: string;
  rating: number;
  ratingCount: number;
  description: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  returnPolicy: string;
};