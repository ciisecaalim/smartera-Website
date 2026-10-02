import Link from "next/link";

import { Container } from "@/components/ui/container";

import type { IctService } from "../types/ict-solutions.types";

import { IctIcon } from "./ict-icon";
import { IctServiceRequestForm } from "./ict-service-request-form";


function ItemSection({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  if (!items.length) {
    return null;
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">

      <h2 className="text-xl font-black text-[#1B519F]">
        {title}
      </h2>

      <ul className="mt-4 grid gap-3 sm:grid-cols-2">

        {items.map((item) => (
          <li
            key={item}
            className="flex gap-2 text-sm leading-6 text-slate-600"
          >
            <span className="font-black text-[#1B519F]">
              ✓
            </span>

            <span>
              {item}
            </span>
          </li>
        ))}

      </ul>

    </section>
  );
}


export function IctServiceDetails({
  service,
}: {
  service: IctService;
}) {
  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="bg-[#F5F9FF] py-12">

        <Container>

          <Link
            href="/ict-solutions"
            className="hidden"
          >
            {null}
          </Link>


          <div className="flex max-w-4xl gap-5">

            <span
              className="
                flex
                h-14
                w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-[#1B519F]
                text-white
              "
            >
              <IctIcon name={service.icon} />
            </span>


            <div>

              <p className="text-[10px] font-black uppercase tracking-[.14em] text-[#F59223]">
                ICT Service
              </p>

              <h1 className="mt-2 text-[clamp(2.3rem,5vw,4rem)] font-black tracking-[-.04em] text-[#1B519F]">
                {service.title}
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                {service.shortDescription}
              </p>


              <div className="mt-6 flex flex-wrap gap-3">

                <a
                  href="#ict-service-request"
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#1B519F]
                    px-5
                    text-xs
                    font-black
                    text-white
                    transition
                    hover:-translate-y-0.5
                    hover:bg-[#174783]
                  "
                >
                  Request This Service
                </a>

                <Link
                  href="/contact"
                  className="
                    inline-flex
                    h-11
                    items-center
                    justify-center
                    rounded-xl
                    border border-slate-200
                    bg-white
                    px-5
                    text-xs
                    font-black
                    text-[#1B519F]
                    transition
                    hover:border-[#1B519F]
                  "
                >
                  Contact Smartera
                </Link>

              </div>

            </div>

          </div>

        </Container>

      </section>


      {/* =====================================================
          DETAILS
      ===================================================== */}
      <section className="bg-white py-14">

        <Container className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">

          <main className="space-y-5">

            <section className="rounded-2xl border border-slate-200 bg-white p-6">

              <h2 className="text-xl font-black text-[#1B519F]">
                Service Overview
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600">
                {service.overview}
              </p>

            </section>


            <ItemSection
              title="Benefits"
              items={service.benefits}
            />


            <ItemSection
              title="Who This Service Is For"
              items={service.targetClients}
            />


            <ItemSection
              title="Common Use Cases"
              items={service.useCases}
            />

          </main>


          <aside
            className="
              h-fit
              rounded-2xl
              bg-[#071D3D]
              p-6
              text-white
              lg:sticky
              lg:top-28
            "
          >

            <p className="text-[9px] font-black uppercase tracking-[.16em] text-[#F59223]">
              Start a Project
            </p>

            <h2 className="mt-2 text-xl font-black">
              Discuss your project
            </h2>

            <p className="mt-3 text-sm leading-6 text-blue-100/75">
              Tell us what your organization needs and
              Smartera can review the project requirements.
            </p>


            <a
              href="#ict-service-request"
              className="
                mt-6
                flex
                h-10
                w-full
                items-center
                justify-center
                rounded-xl
                bg-[#F59223]
                px-4
                text-xs
                font-black
                text-white
                transition
                hover:bg-[#df7e12]
              "
            >
              Request This Service
            </a>


            <Link
              href="/contact"
              className="
                mt-3
                flex
                h-10
                w-full
                items-center
                justify-center
                rounded-xl
                border border-white/15
                bg-white/[0.06]
                px-4
                text-xs
                font-black
                text-white
                transition
                hover:bg-white/10
              "
            >
              Contact Smartera
            </Link>

          </aside>

        </Container>

      </section>


      {/* =====================================================
          PROJECT REQUEST FORM
      ===================================================== */}
      <IctServiceRequestForm
        serviceTitle={service.title}
        serviceSlug={service.slug}
      />

    </>
  );
}
