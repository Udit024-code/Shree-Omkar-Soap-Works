"use client";

import { useLang } from "./LanguageProvider";
import { BUSINESS } from "@/lib/site";

export default function Footer() {
  const { lang, t } = useLang();
  return (
    <footer className="border-t border-gray-400 bg-gray-50 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 sm:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold text-blue-800">
            {lang === "hi" ? BUSINESS.nameHi : BUSINESS.nameEn}
          </div>
          <div className="text-gray-500 mt-1">Since 1989</div>
        </div>
        <div>
          <div className="font-semibold text-blue-800 mb-2">{t.contactTitle}</div>
          <a href={`tel:${BUSINESS.phone}`} className="block text-gray-600 hover:text-blue-800">
            {BUSINESS.phone}
          </a>
          <a
            href={`mailto:${BUSINESS.email}`}
            className="block text-gray-600 hover:text-blue-800 break-all"
          >
            {BUSINESS.email}
          </a>
        </div>
        <div>
          <div className="font-semibold text-blue-800 mb-2">{t.address}</div>
          <div className="text-gray-600">
            {lang === "hi" ? BUSINESS.addressHi : BUSINESS.addressEn}
          </div>
        </div>
      </div>
      <div className="border-t border-gray-400 text-center text-xs text-gray-500 py-4">
        © {new Date().getFullYear()} {BUSINESS.nameEn}. {t.footerRights}
      </div>
    </footer>
  );
}
