"use client";

import { ExceptionState } from "./exception-state";

export function EmptyState({ title, description, actionLabel = "Clear filters", onAction, className }: { title: string; description: string; actionLabel?: string; onAction?: () => void; className?: string }) {
  return <ExceptionState compact className={className} title={title} description={description} eyebrow="No data available" primaryHref="" action={onAction ? <button type="button" onClick={onAction} className="min-h-11 rounded-xl bg-[#1B519F] px-5 py-3 text-xs font-black text-white shadow-md transition hover:bg-[#174783]">{actionLabel}</button> : undefined} />;
}

