"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CloseIcon, SearchIcon } from "@/features/academics/components/icons";
import { getSearchSuggestions } from "@/features/academics/services/course.service";
import { cn } from "@/lib/cn";

export function SearchBar({
  initialQuery = "",
  placeholder = "Search for anything",
  size = "nav",
  className,
  buttonLabel,
}: {
  initialQuery?: string;
  placeholder?: string;
  size?: "nav" | "hero";
  className?: string;
  buttonLabel?: string;
}) {
  const router = useRouter();
  const listId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const suggestions = getSearchSuggestions(query);

  useEffect(() => {
    const onPointer = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    return () => document.removeEventListener("mousedown", onPointer);
  }, []);

  const submit = (value = query) => {
    const next = value.trim();
    setOpen(false);
    router.push(next ? `/academics/search?q=${encodeURIComponent(next)}` : "/academics/search");
  };

  return (
    <div ref={containerRef} className={cn("relative w-full", className)}>
      <form
        role="search"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
        className={cn(
          "flex items-center gap-2.5 border bg-white",
          size === "hero"
            ? "min-h-[52px] rounded-[12px] border-[#E5EAF1] p-1.5 pl-4 shadow-[0_8px_22px_rgba(15,23,42,0.06)]"
            : "min-h-12 rounded-full border-[#6A6F73]/45 px-4",
        )}
      >
        {size !== "hero" ? <SearchIcon className="h-[18px] w-[18px] shrink-0 text-[#6A6F73]" /> : null}
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={placeholder}
          aria-label={placeholder}
          aria-autocomplete="list"
          aria-controls={listId}
          className={cn(
            "w-full bg-transparent text-[#0B1F3A] outline-none placeholder:text-[#6A6F73]",
            size === "hero" ? "text-[15px]" : "text-[15px]",
          )}
        />
        {query ? (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="rounded-full p-1 text-slate-400 hover:text-[#0B1F3A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            aria-label="Clear search"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        ) : null}
        {size === "hero" && !query ? <SearchIcon className="mr-1 h-4 w-4 shrink-0 text-slate-400" /> : null}
        {buttonLabel ? (
          <button
            type="submit"
            className="inline-flex h-[42px] shrink-0 items-center justify-center rounded-[10px] bg-[#1B519F] px-6 text-sm font-bold text-white transition hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
          >
            {buttonLabel}
          </button>
        ) : (
          <button type="submit" className="sr-only">
            Search
          </button>
        )}
      </form>

      {open && suggestions.length > 0 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-40 mt-2 max-h-72 w-full overflow-auto rounded-xl border border-[#E5EAF1] bg-white p-2 shadow-[0_20px_40px_rgba(11,31,58,0.12)]"
        >
          {suggestions.map((course) => (
            <li key={course.id} role="option" aria-selected={false}>
              <button
                type="button"
                onClick={() => submit(course.title)}
                className="flex w-full flex-col rounded-lg px-3 py-2 text-left transition hover:bg-[#F7F9FC] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
              >
                <span className="text-sm font-semibold text-[#0B1F3A]">{course.title}</span>
                <span className="text-xs text-slate-500">{course.subcategory}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

