"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/components/LanguageProvider";
import ProductCard from "@/components/ProductCard";
import { BUSINESS } from "@/lib/site";
import type { Product } from "@/lib/site";

export default function HomeView({ products }: { products: Product[] }) {
  const { lang, t } = useLang();
  return (
    <div>
      <section className="border-b border-gray-300">
        <div className="max-w-6xl mx-auto px-4 py-16 sm:py-24 text-center">
          <Image
            src="/logo.png"
            alt="Shree Omkar Soap Works logo"
            width={120}
            height={120}
            className="mx-auto"
            priority
          />
          <h1 className="mt-6 text-3xl sm:text-5xl font-bold text-blue-800 tracking-tight">
            {lang === "hi" ? BUSINESS.nameHi : BUSINESS.nameEn}
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-600">{t.tagline}</p>
          <p className="mt-2 text-gray-500">{t.heroSub}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="bg-blue-800 hover:bg-blue-700 text-white font-medium rounded-md px-6 py-3"
            >
              {t.enquireNow}
            </Link>
            <a
              href={`https://wa.me/${BUSINESS.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-gray-300 hover:border-green-600 hover:text-green-700 text-gray-700 font-medium rounded-md px-6 py-3"
            >
              {t.whatsappUs}
            </a>
          </div>
        </div>
      </section>

      <section className="border-b border-gray-300 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap justify-center gap-x-12 gap-y-1 text-gray-600 text-sm sm:text-base">
          {t.highlights.map((h) => (
            <span key={h} className="flex items-center gap-2">
              <span className="text-blue-800 font-bold">✓</span> {h}
            </span>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-800 text-center tracking-tight">
          {t.ourProducts}
        </h2>
        <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
