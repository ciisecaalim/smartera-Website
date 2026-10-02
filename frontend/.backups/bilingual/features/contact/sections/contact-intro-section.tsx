import Image from "next/image";

import { contactIntro } from "@/features/contact/data/contact.data";

type ContactIconName =
  | "message"
  | "clock"
  | "support";

function ContactIcon({
  name,
}: {
  name: ContactIconName;
}) {
  if (name === "clock") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }

  if (name === "support") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="h-5 w-5"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="3" />
        <path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path d="M4 5h16v11H8l-4 4V5Z" />
      <path d="M8 9h8M8 12h5" />
    </svg>
  );
}

/**
 * Compact contact welcome banner.
 *
 * Uses a real image background with a branded overlay instead of
 * repeating the large text-only hero pattern used elsewhere.
 */
export function ContactIntroSection() {
  return (
    <section className="relative flex min-h-screen items-center bg-white py-10 sm:py-12 lg:h-screen lg:py-10">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* =====================================================
            WELCOME IMAGE BANNER
           ===================================================== */}
        <div className="group relative min-h-[340px] overflow-hidden rounded-[30px] shadow-[0_24px_70px_rgba(6,59,134,0.16)] sm:min-h-[390px] lg:min-h-[430px]">
          <Image
            src="/images/contact/contact-team.jpg"
            alt="Smartera Hub contact and support team"
            fill
            priority
            sizes="100vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045] motion-reduce:transform-none"
          />

          {/* Brand overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#1B519F]/95 via-[#1B519F]/78 to-[#1B519F]/35"
            aria-hidden="true"
          />

          <div
            className="absolute inset-0 bg-gradient-to-t from-[#1B519F]/55 via-transparent to-transparent"
            aria-hidden="true"
          />

          {/* Decorative glow */}
          <div
            className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#1B519F]/25 blur-3xl"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute -bottom-28 left-[28%] h-64 w-64 rounded-full bg-[#F59223]/18 blur-3xl"
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative flex min-h-[340px] items-center px-6 py-10 sm:min-h-[390px] sm:px-10 lg:min-h-[430px] lg:px-14">
            <div className="max-w-[720px]">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-black uppercase tracking-[0.17em] text-[#FFD08F] backdrop-blur-md sm:text-[11px]">
                <span className="h-2 w-2 rounded-full bg-[#F59223]" />

                Welcome to Contact Page
              </span>

              <h1 className="mt-5 max-w-[16ch] text-[clamp(2.1rem,4vw,4rem)] font-black leading-[1.05] tracking-[-0.04em] text-white">
                Aan ka wada hadalno tallaabadaada xigta.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-blue-50 sm:text-base sm:leading-8 lg:text-lg">
                Haddii aad qabto su&apos;aal ku saabsan tababar,
                shaqo, internship, partnership ama adeegyada
                Smartera Hub, nala soo xiriir.
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className="h-1.5 w-14 rounded-full bg-[#F59223]" />
                <span className="h-1.5 w-8 rounded-full bg-[#1B519F]" />
                <span className="h-1.5 w-2 rounded-full bg-white/50" />
              </div>
            </div>
          </div>

          {/* Bottom brand ribbons */}
          <div
            className="pointer-events-none absolute bottom-0 right-[-2%] h-12 w-[48%] skew-x-[-22deg] bg-[#1B519F]/95"
            aria-hidden="true"
          />

          <div
            className="pointer-events-none absolute bottom-0 right-[-2%] h-7 w-[30%] skew-x-[-22deg] bg-[#F59223]"
            aria-hidden="true"
          />
        </div>

        {/* =====================================================
            CONTACT METHODS
           ===================================================== */}
        <div className="relative z-10 mx-auto -mt-7 grid max-w-[1080px] gap-4 px-2 sm:grid-cols-3 sm:px-4">
          {contactIntro.methods.map((method, index) => (
            <article
              key={method.number}
              className="group flex min-h-[135px] items-start gap-4 rounded-[20px] border border-slate-200 bg-white p-5 shadow-[0_14px_40px_rgba(6,59,134,0.10)] transition-all duration-300 hover:-translate-y-2 hover:border-[#1B519F]/20 hover:shadow-xl motion-reduce:transform-none"
            >
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-sm transition-all duration-300 group-hover:scale-110 ${
                  index === 1
                    ? "bg-[#F59223]"
                    : "bg-[#1B519F]"
                }`}
              >
                <ContactIcon name={method.icon} />
              </span>

              <div className="min-w-0">
                <h2 className="text-sm font-black text-[#1B519F]">
                  {method.title}
                </h2>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  {method.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

