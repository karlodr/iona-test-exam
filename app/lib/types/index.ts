
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
  thumbnail: string;
  discountPercentage: number;
  stock: number;
};

export type ProductListResponse = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};