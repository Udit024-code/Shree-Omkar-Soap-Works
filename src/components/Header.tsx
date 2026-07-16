"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useLang } from "./LanguageProvider";
import { BUSINESS } from "@/lib/site";

export default function Header() {
  const { lang, t, setLang } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/", label: t.home },
    { href: "/products", label: t.products },
    { href: "/about", label: t.about },
    { href: "/contact", label: t.contact },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-400">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <Link href="/" className="flex items-center gap-3 min-w-0">
          <Image src="/logo.png" alt="Shree Omkar Soap Works logo" width={44} height={44} />
          <div className="min-w-0">
            <div className="font-semibold text-blue-800 leading-tight sm:text-lg truncate">
              {lang === "hi" ? BUSINESS.nameHi : BUSINESS.nameEn}
            </div>
            <div className="text-xs text-gray-500">Since 1989</div>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-gray-700">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`hover:text-blue-800 ${
                pathname === l.href ? "text-blue-800 underline underline-offset-8" : ""
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={`tel:${BUSINESS.phone}`}
            className="hidden sm:block text-sm font-medium text-blue-800"
          >
            {BUSINESS.phone}
          </a>
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="border border-gray-400 text-gray-700 rounded-md px-3 py-1 text-sm hover:border-blue-800 hover:text-blue-800"
            aria-label="Toggle language"
          >
            {lang === "en" ? "हिन्दी" : "English"}
          </button>
          <button
            className="md:hidden text-blue-800 text-2xl"
            onClick={() => setOpen(!open)}
            aria-label="Menu"
          >
            ☰
          </button>
        </div>
      </div>
      {open && (
        <nav className="md:hidden border-t border-gray-400 bg-white px-4 py-2 flex flex-col gap-2 font-medium text-gray-700">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1">
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
