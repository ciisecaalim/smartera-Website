import Image from "next/image";
import Link from "next/link";

import { employmentPreview } from "@/features/home/data/home.data";

export function EmploymentPreviewSection() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20">
      <div className="mx-auto w-full max-w-[1240px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-[#1B519F]">
              {employmentPreview.eyebrow}
            </p>

            <h2 className="mt-2 text-[clamp(1.8rem,3vw,2.6rem)] font-black tracking-tight text-[#1B519F]">
              {employmentPreview.title}
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500">
              {employmentPreview.description}
            </p>
          </div>

          <Link
            href={employmentPreview.viewAll.href}
            className="group inline-flex shrink-0 items-center text-sm font-extrabold text-[#1B519F] transition-colors hover:text-[#F59223]"
          >
            {employmentPreview.viewAll.label}

            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
              
            </span>
          </Link>
        </div>

        <div className="mt-9 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {employmentPreview.items.map(
            (item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01] hover:border-[#F59223]/40 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223] motion-reduce:transform-none"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.07] motion-reduce:transform-none"
                  />

                  <span className="absolute left-4 top-4 rounded-lg bg-[#1B519F] px-3 py-1.5 text-[10px] font-extrabold text-white shadow">
                    {item.badge}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-black text-[#1B519F]">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.description}
                  </p>

                  <span className="mt-5 inline-flex items-center text-sm font-extrabold text-[#1B519F]">
                    Read More...

                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
                      
                    </span>
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}


