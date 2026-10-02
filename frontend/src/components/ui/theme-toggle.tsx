"use client";

import { useRef, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const THEME_KEY = "smartera-theme";
const THEME_EVENT = "smartera-theme-change";
type Theme = "light" | "dark" | "system";

function getTheme(): Theme {
  const stored = window.localStorage.getItem(THEME_KEY);
  return stored === "light" || stored === "dark" ? stored : "system";
}

function systemUsesDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(theme: Theme) {
  const dark = theme === "dark" || (theme === "system" && systemUsesDark());
  document.documentElement.classList.toggle("smartera-dark", dark);
  document.documentElement.classList.toggle("smartera-system-dark", theme === "system" && dark);
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const syncTheme = () => {
    applyTheme(getTheme());
    callback();
  };

  window.addEventListener(THEME_EVENT, syncTheme);
  window.addEventListener("storage", syncTheme);
  media.addEventListener("change", syncTheme);
  return () => {
    window.removeEventListener(THEME_EVENT, syncTheme);
    window.removeEventListener("storage", syncTheme);
    media.removeEventListener("change", syncTheme);
  };
}

function getSnapshot() {
  const theme = getTheme();
  return `${theme}:${theme === "dark" || (theme === "system" && systemUsesDark())}`;
}

const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
  { value: "light", label: "Light", icon: <SunIcon /> },
  { value: "dark", label: "Dark", icon: <MoonIcon /> },
  { value: "system", label: "System", icon: <SystemIcon /> },
];

/** Persistent light, dark, or operating-system theme control. */
export function ThemeToggle({ className }: { className?: string }) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "system:false");
  const [theme] = snapshot.split(":") as [Theme, string];

  const selectTheme = (next: Theme) => {
    window.localStorage.setItem(THEME_KEY, next);
    applyTheme(next);
    window.dispatchEvent(new Event(THEME_EVENT));
    detailsRef.current?.removeAttribute("open");
  };

  return (
    <details ref={detailsRef} className={cn("group relative shrink-0", className)}>
      <summary className={cn("theme-toggle flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg border border-slate-200 bg-white text-[#10213B] transition marker:content-none hover:border-[#F59223] hover:bg-[#FFF7ED] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] [&::-webkit-details-marker]:hidden", theme === "system" && "bg-slate-100 text-slate-600")} aria-label="Choose color theme" title={`Theme: ${theme}`}>
        {theme === "light" ? <SunIcon /> : theme === "dark" ? <MoonIcon /> : <SystemIcon />}
      </summary>
      <div className="absolute right-0 top-[calc(100%+8px)] z-[80] w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-[0_16px_40px_rgba(8,43,87,.16)]" role="menu" aria-label="Color theme">
        {options.map((option) => (
          <button key={option.value} type="button" role="menuitemradio" aria-checked={theme === option.value} onClick={() => selectTheme(option.value)} className={cn("flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-xs font-semibold text-slate-700 transition hover:bg-[#FFF7ED] hover:text-[#1B519F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]", theme === option.value && "bg-[#EEF5FF] text-[#1B519F]", theme === "system" && option.value === "system" && "bg-slate-100 text-slate-700")}>
            <span className="flex h-5 w-5 items-center justify-center">{option.icon}</span>
            <span className="flex-1">{option.label}</span>
            {theme === option.value ? <CheckIcon /> : null}
          </button>
        ))}
      </div>
    </details>
  );
}

function SunIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41"/></svg>;
}

function MoonIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><path d="M20.5 15.5A9 9 0 0 1 8.5 3.5a9 9 0 1 0 12 12Z"/></svg>;
}

function SystemIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
}

function CheckIcon() {
  return <svg aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.25" className="h-4 w-4 text-[#F59223]"><path d="m5 10 3 3 7-7"/></svg>;
}
