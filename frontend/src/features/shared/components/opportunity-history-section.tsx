"use client";

/* eslint-disable @next/next/no-img-element */

import { useState } from "react";

export type OpportunityHistoryCard = {
  id: string;
  name: string;
  title: string;
  story: string;
  imageUrl?: string | null;
  date?: string | null;
  meta?: string | null;
};

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  items: OpportunityHistoryCard[];
  loading?: boolean;
  errorMessage?: string;
  emptyMessage: string;
};

const decorations = [
  {
    primary: "#159AC0",
    secondary: "#67C35E",
    r1: -7,
    r2: 7,
  },
  {
    primary: "#F0A33A",
    secondary: "#62C266",
    r1: 7,
    r2: -7,
  },
  {
    primary: "#39A9A0",
    secondary: "#2C8FC6",
    r1: -8,
    r2: 6,
  },
  {
    primary: "#2C8FC6",
    secondary: "#72C95D",
    r1: 7,
    r2: -6,
  },
  {
    primary: "#40A99E",
    secondary: "#F0A33A",
    r1: -6,
    r2: 7,
  },
];

function formatDate(value?: string | null) {
  if (!value) return "";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function HistoryImage({
  item,
}: {
  item: OpportunityHistoryCard;
}) {
  const [failed, setFailed] = useState(false);

  const initial =
    item.name.trim().charAt(0).toUpperCase() || "?";

  if (!item.imageUrl || failed) {
    return (
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-[5px] border-white bg-[#EEF5FF] text-3xl font-black text-[#1B519F] shadow-[0_10px_28px_rgba(15,23,42,.22)]">
        {initial}
      </div>
    );
  }

  return (
    <div className="h-[72px] w-[72px] overflow-hidden rounded-full border-[5px] border-white bg-slate-100 shadow-[0_10px_28px_rgba(15,23,42,.22)]">
      <img
        src={item.imageUrl}
        alt={item.name}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

export function OpportunityHistorySection({
  eyebrow,
  title,
  description,
  items,
  loading = false,
  errorMessage = "",
  emptyMessage,
}: Props) {
  // Landing pages must never show more than five history cards.
  const visibleItems = items.slice(0, 5);

  return (
    <section className="overflow-hidden bg-[#F5F9FF] py-12 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-7 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[.22em] text-[#F59223]">
            {eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-black text-[#1B519F] sm:text-4xl lg:text-[42px]">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            {description}
          </p>
        </div>

        {loading ? (
          <div className="mt-10 grid gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="mx-auto h-[280px] w-full max-w-[280px] animate-pulse rounded-[22px] bg-slate-200"
              />
            ))}
          </div>
        ) : null}

        {!loading && errorMessage ? (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-slate-200 bg-white px-6 py-5 text-center text-sm font-semibold text-slate-500">
            {errorMessage}
          </div>
        ) : null}

        {!loading &&
        !errorMessage &&
        visibleItems.length === 0 ? (
          <div className="mx-auto mt-12 max-w-xl rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-6 text-center text-sm font-semibold text-slate-500">
            {emptyMessage}
          </div>
        ) : null}

        {!loading &&
        !errorMessage &&
        visibleItems.length > 0 ? (
          <div className="mt-10 grid items-stretch gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {visibleItems.map((item, index) => {
              const decoration =
                decorations[index % decorations.length];

              return (
                <article
                  key={item.id}
                  className="group relative mx-auto w-full max-w-[280px] pt-10"
                >
                  <div
                    aria-hidden="true"
                    style={{
                      background: decoration.secondary,
                      transform: `rotate(${decoration.r2}deg)`,
                    }}
                    className="absolute bottom-[-8px] left-3 right-3 top-12 rounded-[22px] opacity-95 transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  <div
                    aria-hidden="true"
                    style={{
                      background: decoration.primary,
                      transform: `rotate(${decoration.r1}deg)`,
                    }}
                    className="absolute bottom-[-8px] left-3 right-3 top-12 rounded-[22px] transition-transform duration-500 group-hover:scale-[1.02]"
                  />

                  <div className="relative z-10 h-full min-h-[260px] rounded-[22px] bg-white px-4 pb-5 pt-12 text-center shadow-[0_18px_50px_rgba(15,23,42,.15)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_24px_65px_rgba(15,23,42,.20)]">
                    <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
                      <HistoryImage item={item} />
                    </div>

                    <h3 className="text-base font-black leading-6 text-slate-900">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-xs font-semibold italic text-slate-500">
                      {item.title}
                    </p>

                    {item.meta ? (
                      <p className="mt-1 text-xs font-bold text-[#1B519F]/70">
                        {item.meta}
                      </p>
                    ) : null}

                    {item.date ? (
                      <p className="mt-3 text-[10px] font-black uppercase tracking-[.15em] text-[#1B519F]/60">
                        {formatDate(item.date)}
                      </p>
                    ) : null}

                    <div className="mx-auto mt-4 h-px w-12 bg-slate-200" />

                    <p className="mt-3 line-clamp-3 text-xs leading-5 text-slate-500">
                      {item.story}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        ) : null}
      </div>
    </section>
  );
}
