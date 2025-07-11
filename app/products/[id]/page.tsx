import { View } from "./index";


interface PageProps {
  params: { id: string };
}

export default function Page({ params }: PageProps) {
  const { id } = params;
  return <View id={Number(id)} />;
}
