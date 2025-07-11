import { View } from "./index";

import { ProductAPI } from "@/app/lib/api/product";

export default async function Page() {
  const products = await ProductAPI.getAll();

  if (!products) {
    return <div>No products found</div>;
  }

  return <View products={products.products} />;
}