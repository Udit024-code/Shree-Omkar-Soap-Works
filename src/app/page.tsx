import HomeView from "@/components/HomeView";
import { getProductsSafe } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProductsSafe();
  return <HomeView products={products} />;
}
