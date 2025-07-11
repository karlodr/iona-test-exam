import { View } from "./index";
import { ProductAPI } from "@/app/lib/api/product";


type PageProps = {
  params: { id: string };
};

export default async function Page({ params }: PageProps) {
  const { id } = params;
  const product = await ProductAPI.getById(Number(id));

  if (!product) {
    return <div>Product not found</div>;
  }

  return <View product={product} />;
}
