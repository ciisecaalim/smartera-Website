import Image from "next/image";
import Link from "next/link";

import { HomeIcon } from "@/features/home/components/home-icon";
import { homeOpportunityCategories } from "@/features/home/data/home.data";
import {
  getHomeFeaturedTrainer,
  trainerAsset,
} from "@/features/trainers/data/trainers.data";

/** Compact opportunity cards modeled after the approved image-led reference. */
export async function OpportunityCategoriesSection() {
  const featuredTrainer =
    await getHomeFeaturedTrainer();

  return (
    <section className="bg-brand-subtle py-12 sm:py-14 lg:py-16">
      <div className="mx-auto w-full max-w-[1560px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-black uppercase tracking-[0.18em] text-brand-blue">
            {homeOpportunityCategories.eyebrow}
          </p>

          <h2 className="mt-3 text-[clamp(1.9rem,3vw,2.9rem)] font-black tracking-[-0.035em] text-brand-heading">
            {homeOpportunityCategories.title}
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-brand-text sm:text-base">
            {homeOpportunityCategories.description}
          </p>
        </div>

        <div className="mt-9 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {homeOpportunityCategories.items.map(
            (item, index) => {
              const isDynamicTrainer =
                item.title === "Trainer" &&
                Boolean(featuredTrainer);

              const title =
                isDynamicTrainer && featuredTrainer
                  ? featuredTrainer.fullName
                  : item.title;

              const trainerSubtitle =
                featuredTrainer?.professionalTitle ||
                featuredTrainer?.specialization ||
                "";

              const description =
                isDynamicTrainer && featuredTrainer
                  ? [
                      trainerSubtitle,
                      featuredTrainer.shortBio,
                    ]
                      .filter(Boolean)
                      .join(" — ") ||
                    item.description
                  : item.description;

              const image =
                isDynamicTrainer && featuredTrainer
                  ? trainerAsset(
                      featuredTrainer.profileImage,
                    )
                  : item.image;

              const href =
                isDynamicTrainer && featuredTrainer
                  ? `/trainers/${encodeURIComponent(
                      featuredTrainer.slug,
                    )}`
                  : item.href;

              const imageAlt =
                isDynamicTrainer && featuredTrainer
                  ? featuredTrainer.imageAlt ||
                    `${featuredTrainer.fullName} - Smartera Hub Trainer`
                  : `${item.title} - Smartera Hub`;

              return (
                <article
                  key={item.title}
                  className="smartera-hero-reveal group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-brand-border bg-white shadow-[0_8px_22px_rgba(16,33,59,0.07)] transition duration-300 hover:-translate-y-1 hover:border-brand-blue/30 hover:shadow-[0_14px_30px_rgba(27,81,159,0.13)] motion-reduce:transform-none"
                  style={{
                    animationDelay: `${index * 80}ms`,
                  }}
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
                    <Image
                      src={image}
                      alt={imageAlt}
                      fill
                      unoptimized={
                        image.startsWith("http://") ||
                        image.startsWith("https://")
                      }
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none"
                    />
                  </div>

                  <div className="relative flex flex-1 flex-col px-4 pb-4 pt-7 before:absolute before:inset-0 before:origin-left before:scale-x-0 before:bg-brand-blue before:transition-transform before:duration-500 before:ease-out group-hover:before:scale-x-100 motion-reduce:before:transition-none">
                    <span className="opportunity-icon-badge absolute -top-5 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-brand-light text-brand-blue shadow-sm transition-colors duration-300 group-hover:bg-white">
                      <HomeIcon
                        name={item.icon}
                        className="h-5 w-5"
                      />
                    </span>

                    {isDynamicTrainer ? (
                      <p className="relative z-10 mb-1 text-[10px] font-black uppercase tracking-[0.14em] text-brand-blue transition-colors duration-300 group-hover:text-white">
                        Featured Trainer
                      </p>
                    ) : null}

                    <h3 className="relative z-10 text-sm font-black text-brand-heading transition-colors duration-300 group-hover:text-white">
                      {title}
                    </h3>

                    <p className="relative z-10 mt-2 line-clamp-3 min-h-[54px] text-[11px] leading-[18px] text-brand-text transition-colors duration-300 group-hover:text-white">
                      {description}
                    </p>

                    <Link
                      href={href}
                      aria-label={`View ${title}`}
                      className="relative z-10 mt-auto inline-flex w-fit items-center gap-2 pt-3 text-[11px] font-black text-brand-blue transition-colors duration-300 hover:text-brand-blue-hover group-hover:text-white group-hover:hover:text-white focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange focus-visible:ring-offset-2"
                    >
                      See More
                      <span aria-hidden="true">
                        
                      </span>
                    </Link>
                  </div>
                </article>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}