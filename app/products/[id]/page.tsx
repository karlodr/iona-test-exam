import { View } from "./index";
import { ProductAPI } from "@/app/lib/api/product";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await ProductAPI.getById(Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return <View product={product} />;
}
