"use client";

import { useLang } from "./LanguageProvider";
import { BUSINESS } from "@/lib/site";

export default function WhatsAppFab() {
  const { t } = useLang();
  return (
    <a
      href={`https://wa.me/${BUSINESS.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg px-5 py-3 flex items-center gap-2"
    >
      <svg viewBox="0 0 32 32" width="22" height="22" fill="currentColor" aria-hidden="true">
        <path d="M16 3C9.4 3 4 8.4 4 15c0 2.6.8 5 2.2 7L4 29l7.2-2.1c1.5.7 3.1 1.1 4.8 1.1 6.6 0 12-5.4 12-12S22.6 3 16 3zm5.9 16.7c-.3.8-1.5 1.5-2.1 1.6-.6.1-1.3.2-3.7-.8-3.1-1.3-5.1-4.4-5.3-4.6-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5l1 2.4c.1.2.1.4 0 .6l-.4.7-.6.6c-.2.2-.4.4-.2.7.2.4 1 1.6 2.1 2.6 1.5 1.3 2.7 1.7 3.1 1.9.4.2.6.1.8-.1l1.2-1.4c.3-.3.5-.3.8-.2l2.5 1.2c.4.2.6.3.7.5.1.1.1.7-.2 1.5z"/>
      </svg>
      {t.whatsappUs}
    </a>
  );
}
