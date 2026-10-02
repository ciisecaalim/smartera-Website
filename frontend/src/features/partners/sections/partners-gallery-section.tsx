import Image from "next/image";
import { Container } from "@/components/ui/container";

export const partnerGalleryImages = [
  { src: "/images/partners/partners-hero.png", alt: "Professionals beginning a collaborative partnership" },
  { src: "/images/contact/contact-team.jpg", alt: "A team discussing plans around a shared table" },
  { src: "/images/home/impact-building.jpg", alt: "Professionals building practical solutions together" },
  { src: "/images/home/ict-team.jpg", alt: "A technology team collaborating in the workplace" },
] as const;

/** Image-led record of the people and working environments behind collaboration. */
export function PartnersGallerySection() {
  return (
    <section className="bg-white py-14 sm:py-16" aria-labelledby="partners-gallery-title">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-extrabold uppercase tracking-[.16em] text-[#F59223]">Gallery</p>
          <h2 id="partners-gallery-title" className="mt-2 text-[clamp(1.9rem,4vw,3rem)] font-black text-[#1B519F]">Partnership in action</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600">Shared conversations, practical work, and the people who move ideas forward together.</p>
        </div>
        <div className="mt-8 grid auto-rows-[220px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partnerGalleryImages.map((image, index) => (
            <figure key={image.src} className={`relative overflow-hidden rounded-lg ${index === 0 ? "sm:col-span-2 lg:row-span-2 lg:min-h-[456px]" : ""}`}>
              <Image src={image.src} alt={image.alt} fill sizes={index === 0 ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 640px) 100vw, 25vw"} className="object-cover transition-transform duration-500 hover:scale-105 motion-reduce:transform-none" />
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
