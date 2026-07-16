"use client";

import { useLang } from "@/components/LanguageProvider";
import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/site";

export default function ProductsPage() {
  const { t } = useLang();
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-800 text-center tracking-tight">{t.ourProducts}</h1>
      <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </div>
  );
}
