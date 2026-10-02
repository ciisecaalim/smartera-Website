import Image from "next/image";

import { ContactForm } from "@/features/contact/components/contact-form";
import { contactMain } from "@/features/contact/data/contact.data";

export function ContactMainSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1180px] items-start gap-8 px-4 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:gap-10 lg:px-8">
        {/* Left */}
        <div className="min-w-0">
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#F59223] sm:text-xs">
            {contactMain.eyebrow}
          </span>

          <h2 className="mt-3 text-[clamp(1.8rem,2.7vw,2.65rem)] font-black tracking-[-0.03em] text-[#1B519F]">
            {contactMain.title}
          </h2>

          <p className="mt-4 max-w-lg text-sm leading-7 text-slate-600 sm:text-base">
            {contactMain.description}
          </p>

          <div className="group relative mt-7 aspect-[16/11] overflow-hidden rounded-[26px] shadow-[0_20px_55px_rgba(6,59,134,0.12)]">
            <Image
              src={contactMain.image}
              alt={contactMain.imageAlt}
              fill
              sizes="(max-width:1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.055] motion-reduce:transform-none"
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-[#1B519F]/60 via-transparent to-transparent"
              aria-hidden="true"
            />

            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/20 bg-[#1B519F]/80 p-4 backdrop-blur">
              <p className="text-[10px] font-black uppercase tracking-[0.14em] text-[#F59223]">
                SMARTERA HUB
              </p>

              <p className="mt-1 text-sm font-black text-white">
                Learn Today. Lead Tomorrow.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            {contactMain.highlights.map(
              (highlight, index) => (
                <div
                  key={highlight}
                  className="flex items-center gap-2 rounded-xl border border-slate-200 bg-[#F8FBFF] px-3 py-3 text-xs font-bold text-[#1B519F]"
                >
                  <span
                    className={`h-2 w-2 shrink-0 rounded-full ${
                      index === 1 ||
                      index === 3
                        ? "bg-[#F59223]"
                        : "bg-[#1B519F]"
                    }`}
                  />

                  {highlight}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Form */}
        <div className="min-w-0">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

