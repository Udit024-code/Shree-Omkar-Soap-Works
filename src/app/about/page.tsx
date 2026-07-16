"use client";

import Image from "next/image";
import { useLang } from "@/components/LanguageProvider";

export default function AboutPage() {
  const { t } = useLang();
  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-blue-800 text-center tracking-tight">{t.aboutTitle}</h1>
      <div className="mt-8 flex flex-col sm:flex-row gap-8 items-center">
        <Image src="/logo.png" alt="Shree Omkar Soap Works logo" width={180} height={180} />
        <p className="text-lg leading-relaxed text-gray-700">{t.aboutBody}</p>
      </div>
      <div className="mt-10 rounded-lg border border-gray-400 bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-blue-800">{t.aboutQuality}</h2>
        <p className="mt-2 text-gray-700 leading-relaxed">{t.aboutQualityBody}</p>
      </div>
    </div>
  );
}
