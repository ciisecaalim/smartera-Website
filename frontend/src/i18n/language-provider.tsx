"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { translate, type Language } from "./translate";
import { DomTranslator } from "./dom-translator";

type LanguageState = { language: Language; setLanguage: (language: Language) => void; t: (text: string) => string };
const Context = createContext<LanguageState | null>(null);
const fallback: LanguageState = { language: "en", setLanguage: () => {}, t: (text) => text };

export function LanguageProvider({ children }: { children: ReactNode }) {
  // English is always the default. Somali is applied only after a visitor
  // chooses it from the language selector during the current visit.
  const [language, updateLanguage] = useState<Language>("en");

  const setLanguage = useCallback((next: Language) => {
    updateLanguage(next);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = "ltr";
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage, t: (text: string) => translate(text, language) }), [language, setLanguage]);
  return <Context.Provider value={value}><DomTranslator language={language} />{children}</Context.Provider>;
}

export function useLanguage() { return useContext(Context) ?? fallback; }
