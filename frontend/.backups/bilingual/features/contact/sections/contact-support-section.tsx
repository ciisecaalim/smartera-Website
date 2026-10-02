import Link from "next/link";

import { contactSupportAreas } from "@/features/contact/data/contact.data";

export function ContactSupportSection() {
  return (
    <section className="bg-[#F4F7FF] py-14 sm:py-16">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#F59223] sm:text-xs">
            {contactSupportAreas.eyebrow}
          </span>

          <h2 className="mt-3 text-[clamp(1.8rem,2.8vw,2.6rem)] font-black tracking-[-0.03em] text-[#1B519F]">
            {contactSupportAreas.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactSupportAreas.items.map(
            (item, index) => (
              <Link
                key={item.number}
                href={item.href}
                className="group flex min-h-[210px] flex-col rounded-[22px] border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#1B519F]/20 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] motion-reduce:transform-none"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl text-xs font-black text-white ${
                      index === 1 ||
                      index === 3
                        ? "bg-[#F59223]"
                        : "bg-[#1B519F]"
                    }`}
                  >
                    {item.number}
                  </span>

                  <span className="text-[#1B519F] transition-transform duration-300 group-hover:translate-x-1">
                    
                  </span>
                </div>

                <h3 className="mt-5 text-base font-black text-[#1B519F]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

