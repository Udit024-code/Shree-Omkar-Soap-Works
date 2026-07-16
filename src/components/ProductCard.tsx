"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "./LanguageProvider";
import type { Product } from "@/lib/site";

export default function ProductCard({ product }: { product: Product }) {
  const { lang, t } = useLang();
  return (
    <div className="bg-white rounded-lg border border-gray-400 hover:border-gray-600 hover:shadow-sm transition overflow-hidden flex flex-col">
      <div className="relative aspect-square bg-white">
        <Image
          src={product.image}
          alt={lang === "hi" ? product.nameHi : product.nameEn}
          fill
          sizes="(max-width: 640px) 50vw, 33vw"
          className="object-contain p-4"
        />
      </div>
      <div className="p-4 border-t border-gray-300 flex flex-col gap-1 grow text-center">
        <div className="font-semibold text-blue-800 leading-snug">
          {lang === "hi" ? product.nameHi : product.nameEn}
        </div>
        <div className="text-sm text-gray-500">
          {lang === "hi" ? product.typeHi : product.typeEn}
        </div>
        <Link
          href={`/contact?product=${encodeURIComponent(product.nameEn)}`}
          className="mt-3 border border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white text-sm font-medium rounded-md px-4 py-2"
        >
          {t.enquireQuote}
        </Link>
      </div>
    </div>
  );
}
