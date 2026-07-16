"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { T, type Lang } from "@/lib/site";

const LangContext = createContext<{
  lang: Lang;
  t: (typeof T)[Lang];
  setLang: (l: Lang) => void;
}>({ lang: "en", t: T.en, setLang: () => {} });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem("lang");
    if (saved === "hi" || saved === "en") setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    window.localStorage.setItem("lang", l);
  };

  return (
    <LangContext.Provider value={{ lang, t: T[lang], setLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
