import Link from "next/link";

export function EmptyState({
  title,
  description,
  actionHref = "/academics",
  actionLabel = "Browse courses",
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-[#E5EAF1] bg-white px-6 py-14 text-center">
      <h2 className="text-xl font-black text-[#0B1F3A]">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-600">{description}</p>
      <Link
        href={actionHref}
        className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1B519F] px-5 text-sm font-bold text-white transition hover:bg-[#174783] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
      >
        {actionLabel}
      </Link>
    </div>
  );
}

