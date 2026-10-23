import {
  div as Ldiv,
  h2 as Lh2,
  h3 as Lh3,
  p as Lp,
  section as Lsection,
  span as Lspan,
} from "@/i18n/elements";
import Image from "next/image";
import Link from "@/i18n/link";

import { HomeIcon } from "@/features/home/components/home-icon";
import { homeOpportunityCategories } from "@/features/home/data/home.data";
import { getFeaturedHomeCards } from "@/features/home/data/featured-home.data";

const cardTypes = [
  "SWE Program",
  "Trainer",
  "Blog",
  "Internship",
  "Job Opportunity",
] as const;

const cardActions = [
  "View SWE Program",
  "View Trainer",
  "Read Blog",
  "View Internship",
  "View Job",
] as const;

export async function OpportunityCategoriesSection() {
  const featured = await getFeaturedHomeCards();
  const items = homeOpportunityCategories.items.map((item, index) => {
    const dynamic = featured[index];
    return dynamic
      ? {
          ...item,
          ...dynamic,
          title: dynamic.title || item.title,
          href: dynamic.href || item.href,
          image: dynamic.image || item.image,
          imageAlt:
            dynamic.imageAlt || `${dynamic.title || item.title} - Smartera Hub`,
        }
      : { ...item, imageAlt: `${item.title} - Smartera Hub` };
  });

  return (
    <Lsection className="bg-brand-subtle py-12 sm:py-14 lg:py-16">
      <Ldiv className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-8">
        <Ldiv className="mx-auto max-w-3xl text-center">
          <Lp className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-blue">
            {homeOpportunityCategories.eyebrow}
          </Lp>
          <Lh2 className="mt-3 text-[clamp(1.9rem,3vw,2.9rem)] font-black tracking-[-0.035em] text-brand-heading">
            {homeOpportunityCategories.title}
          </Lh2>
          <Lp className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-brand-text sm:text-base">
            {homeOpportunityCategories.description}
          </Lp>
        </Ldiv>

        <Ldiv className="mt-9 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item, index) => (
            <Link
              key={homeOpportunityCategories.items[index].title}
              href={item.href}
              aria-label={`${cardActions[index]}: ${item.title}`}
              className="smartera-hero-reveal group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-brand-border bg-white shadow-[0_8px_22px_rgba(16,33,59,0.07)] transition duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_14px_30px_rgba(27,81,159,0.13)] motion-reduce:transform-none"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <Ldiv className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  unoptimized={item.image.startsWith("http")}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                />
              </Ldiv>
              <Ldiv className="relative flex flex-1 flex-col px-4 pb-4 pt-7 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-brand-blue before:transition-transform before:duration-500 before:ease-out group-hover:before:scale-x-100">
                <Lspan className="opportunity-icon-badge absolute -top-5 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-brand-light text-brand-blue shadow-sm transition-colors duration-300 group-hover:bg-white">
                  <HomeIcon name={item.icon} className="h-5 w-5" />
                </Lspan>
                <Lp className="relative z-10 mb-1 text-[10px] font-black uppercase tracking-[0.14em] text-brand-blue group-hover:text-white">
                  {cardTypes[index]}
                </Lp>
                <Lh3 className="relative z-10 text-sm font-black text-brand-heading transition-colors duration-300 group-hover:text-white">
                  {item.title}
                </Lh3>
                <Lp className="relative z-10 mt-2 line-clamp-3 min-h-[54px] text-[11px] leading-[18px] text-brand-text transition-colors duration-300 group-hover:text-white">
                  {item.description}
                </Lp>
                <Lspan className="relative z-10 mt-auto inline-flex w-fit items-center gap-2 pt-3 text-[11px] font-black text-brand-blue transition-colors duration-300 group-hover:text-white">
                  {cardActions[index]}
                </Lspan>
              </Ldiv>
            </Link>
          ))}
        </Ldiv>
      </Ldiv>
    </Lsection>
  );
}
