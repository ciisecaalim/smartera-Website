import { Container } from "@/components/ui/container";

export function PartnersCtaSection() {
  return (
    <section className="bg-white pb-10 pt-4">
      <Container>

        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-[#EEF5FF] to-[#F8FBFF] px-6 py-9 shadow-[inset_0_0_0_1px_rgba(7,94,222,.08)] sm:px-10 lg:flex lg:items-center lg:justify-between lg:gap-10">

          <div
            className="absolute -right-10 -top-12 h-40 w-40 rounded-full border-[24px] border-[#1B519F]/5"
            aria-hidden="true"
          />

          <div className="relative">

            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#1B519F]">
              Let&apos;s collaborate
            </p>

            <h2 className="mt-2 text-2xl font-black tracking-tight text-[#1B519F] sm:text-3xl">
              Want to Explore Partnership?
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Browse the partner profiles and open
              a profile to access the partnership
              request form.
            </p>

          </div>

          <a
            href="#partners-directory"
            className="relative mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-[#1B519F] px-6 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-[#174783] sm:w-auto lg:mt-0"
          >
            Read More...
            <span className="ml-2" aria-hidden="true">
              ↑
            </span>
          </a>

        </div>

      </Container>
    </section>
  );
}
