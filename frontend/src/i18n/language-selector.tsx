"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "./language-provider";

const languages = [
  { code: "en" as const, label: "English", flag: "🇬🇧" },
  { code: "so" as const, label: "Soomaali", flag: "🇸🇴" },
];

export function LanguageSelector({ className = "" }: { className?: string }) {
  const { language, setLanguage, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const selected = languages.find((item) => item.code === language) ?? languages[0];

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <div ref={ref} className={`relative ${className}`} data-no-translate>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("Website language")}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-9 min-w-[112px] items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-2.5 text-xs font-semibold text-[#1B519F] shadow-sm transition hover:border-[#F59223] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
      >
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="text-base leading-none">{selected.flag}</span>
          <span>{selected.label}</span>
        </span>
        <svg viewBox="0 0 20 20" className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="m5.5 7.5 4.5 4.5 4.5-4.5" />
        </svg>
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label={t("Website language")}
          className="absolute right-0 top-[calc(100%+7px)] z-[90] w-36 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_18px_45px_rgba(8,43,87,.16)]"
        >
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              role="option"
              aria-selected={language === item.code}
              onClick={() => {
                setLanguage(item.code);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs font-semibold transition ${
                language === item.code
                  ? "bg-[#EEF5FF] text-[#1B519F]"
                  : "text-slate-700 hover:bg-slate-50 hover:text-[#1B519F]"
              }`}
            >
              <span aria-hidden="true" className="text-base leading-none">{item.flag}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
