import Link from "next/link";

export function PartnersCtaSection() {
  return (
    <section className="bg-[#F7FAFF] pb-12 sm:pb-14">
      <div className="mx-auto w-full max-w-[1380px] px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[22px] border border-[#CFE0F5] bg-[linear-gradient(110deg,#F4F8FF_0%,#FFFFFF_55%,#EEF5FF_100%)] px-6 py-6 shadow-[0_14px_40px_rgba(27,81,159,0.06)] sm:px-8 lg:flex lg:items-center lg:justify-between lg:gap-10">
          <div className="flex items-center gap-5">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#0B5FD7] text-white shadow-lg shadow-blue-900/10">
              <svg
                viewBox="0 0 24 24"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                aria-hidden="true"
              >
                <path d="m8.5 12.5 2.2 2.2a2.2 2.2 0 0 0 3.1 0l5.2-5.2" />
                <path d="m15.5 11.5-2.2-2.2a2.2 2.2 0 0 0-3.1 0L5 14.5" />
                <path d="M7 8.5 4.5 6 2 8.5l3.2 3.2" />
                <path d="m17 15.5 2.5 2.5 2.5-2.5-3.2-3.2" />
              </svg>
            </div>

            <div>
              <h2 className="text-lg font-black tracking-[-0.015em] text-[#071B41] sm:text-xl">
                Interested in partnering with Smartera Hub?
              </h2>

              <p className="mt-1 text-sm font-medium leading-6 text-slate-500">
                Let us work together to create more opportunities for learners and communities.
              </p>
            </div>
          </div>

          <Link
            href="/contact"
            className="mt-5 inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-[#075DCE] px-6 text-sm font-black text-white shadow-[0_10px_24px_rgba(7,93,206,0.18)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#064EAD] hover:shadow-[0_16px_30px_rgba(7,93,206,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#075DCE] focus-visible:ring-offset-2 motion-reduce:transform-none lg:mt-0"
          >
            Become a Partner

            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m13 6 6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}