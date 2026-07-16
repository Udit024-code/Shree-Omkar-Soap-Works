import ProductsView from "@/components/ProductsView";
import { getProductsSafe } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await getProductsSafe();
  return <ProductsView products={products} />;
}
