"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LanguageProvider";
import { BUSINESS } from "@/lib/site";
import { FAQS, matchFaq } from "@/lib/faqs";

type Msg =
  | { role: "user"; text: string }
  | { role: "bot"; text: string }
  | { role: "fallback"; text: string; question: string };

export default function Chatbot() {
  const { lang, t } = useLang();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const bodyRef = useRef<HTMLDivElement>(null);

  // Seed the greeting when the panel opens, and keep it in sync with the
  // language as long as the visitor hasn't asked anything yet.
  useEffect(() => {
    if (open && messages.length <= 1) {
      setMessages([{ role: "bot", text: t.chatGreeting }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, lang]);

  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const answer = (question: string) => {
    const faq = matchFaq(question, lang);
    if (faq) {
      setMessages((m) => [
        ...m,
        { role: "user", text: question },
        { role: "bot", text: lang === "hi" ? faq.aHi : faq.aEn },
      ]);
    } else {
      setMessages((m) => [
        ...m,
        { role: "user", text: question },
        { role: "fallback", text: t.chatFallback, question },
      ]);
    }
  };

  const askChip = (faqIndex: number) => {
    const faq = FAQS[faqIndex];
    setMessages((m) => [
      ...m,
      { role: "user", text: lang === "hi" ? faq.qHi : faq.qEn },
      { role: "bot", text: lang === "hi" ? faq.aHi : faq.aEn },
    ]);
  };

  const onSend = (e: React.FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    answer(q);
    setInput("");
  };

  return (
    <>
      {/* Launcher button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={t.chatOpen}
        className="fixed bottom-5 right-5 z-50 bg-blue-800 hover:bg-blue-700 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center"
      >
        {open ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4 4h16a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H8l-4 4V5a1 1 0 0 1 1-1zm3 5v2h10V9H7zm0 4v2h7v-2H7z" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-50 w-[calc(100vw-2.5rem)] sm:w-96 max-h-[70vh] bg-white rounded-xl border border-gray-400 shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-800 text-white px-4 py-3">
            <div className="font-semibold">{t.chatTitle}</div>
            <div className="text-xs text-blue-100">{BUSINESS.nameEn} · Since 1989</div>
          </div>

          {/* Messages */}
          <div ref={bodyRef} className="grow overflow-y-auto p-3 flex flex-col gap-2 bg-gray-50">
            {messages.map((m, i) => {
              if (m.role === "user") {
                return (
                  <div key={i} className="self-end max-w-[85%] bg-blue-800 text-white rounded-2xl rounded-br-sm px-3 py-2 text-sm">
                    {m.text}
                  </div>
                );
              }
              if (m.role === "bot") {
                return (
                  <div key={i} className="self-start max-w-[85%] bg-white border border-gray-300 text-gray-800 rounded-2xl rounded-bl-sm px-3 py-2 text-sm">
                    {m.text}
                  </div>
                );
              }
              // fallback
              return (
                <div key={i} className="self-start max-w-[90%] bg-white border border-gray-300 text-gray-800 rounded-2xl rounded-bl-sm px-3 py-2 text-sm flex flex-col gap-2">
                  <span>{m.text}</span>
                  <a href={`tel:${BUSINESS.phone}`} className="font-medium text-blue-800 hover:underline">
                    {t.callUs}: {BUSINESS.phone}
                  </a>
                  <a href={`mailto:${BUSINESS.email}`} className="font-medium text-blue-800 hover:underline break-all">
                    {t.emailUs}: {BUSINESS.email}
                  </a>
                  <a
                    href={`https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(m.question)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-md px-3 py-2"
                  >
                    <svg viewBox="0 0 32 32" width="16" height="16" fill="currentColor" aria-hidden="true">
                      <path d="M16 3C9.4 3 4 8.4 4 15c0 2.6.8 5 2.2 7L4 29l7.2-2.1c1.5.7 3.1 1.1 4.8 1.1 6.6 0 12-5.4 12-12S22.6 3 16 3zm5.9 16.7c-.3.8-1.5 1.5-2.1 1.6-.6.1-1.3.2-3.7-.8-3.1-1.3-5.1-4.4-5.3-4.6-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1.1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .5-.1.7.5l1 2.4c.1.2.1.4 0 .6l-.4.7-.6.6c-.2.2-.4.4-.2.7.2.4 1 1.6 2.1 2.6 1.5 1.3 2.7 1.7 3.1 1.9.4.2.6.1.8-.1l1.2-1.4c.3-.3.5-.3.8-.2l2.5 1.2c.4.2.6.3.7.5.1.1.1.7-.2 1.5z" />
                    </svg>
                    {t.chatFallbackWhatsapp}
                  </a>
                </div>
              );
            })}
          </div>

          {/* Quick-reply FAQ chips */}
          <div className="border-t border-gray-300 px-3 py-2 bg-white">
            <div className="text-xs text-gray-500 mb-1">{t.chatCommon}</div>
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {FAQS.map((faq, i) => (
                <button
                  key={i}
                  onClick={() => askChip(i)}
                  className="shrink-0 border border-gray-400 text-gray-700 hover:border-blue-800 hover:text-blue-800 rounded-full px-3 py-1 text-xs whitespace-nowrap"
                >
                  {lang === "hi" ? faq.qHi : faq.qEn}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={onSend} className="border-t border-gray-300 p-2 flex gap-2 bg-white">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t.chatPlaceholder}
              className="grow border border-gray-400 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-700 text-gray-900 placeholder:text-gray-500 [color-scheme:light]"
            />
            <button type="submit" className="bg-blue-800 hover:bg-blue-700 text-white text-sm font-medium rounded-md px-4">
              {t.chatSend}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
