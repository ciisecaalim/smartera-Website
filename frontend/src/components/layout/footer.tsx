
import { a as La, div as Ldiv, footer as Lfooter, h2 as Lh2, nav as Lnav, p as Lp, section as Lsection, span as Lspan } from "@/i18n/elements";
import Link from "@/i18n/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { opportunityNavigation, primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social-links";

function FooterTitle({ children }: { children: React.ReactNode }) {
  return <Lh2 className="text-xs font-black uppercase tracking-[.14em] text-white">{children}<Lspan className="mt-3 block h-0.5 w-10 rounded-full bg-[#F59223]" /></Lh2>;
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
      <path d="M13.5 8H16V4.2c-.43-.06-1.91-.2-3.67-.2C8.66 4 6.14 6.3 6.14 10.53V14H2v4.25h4.14V29h5.08V18.25h4.23L16.12 14h-4.9v-3.05C11.22 9.72 11.55 8 13.5 8Z" transform="translate(3 -4) scale(.75)" />
    </svg>
  );
}

export function Footer() {
  const contact = [siteConfig.contact.email, siteConfig.contact.phone, siteConfig.contact.location].filter(Boolean);
  return (
    <Lfooter className="relative overflow-hidden bg-[#1B519F] text-white">
      <Ldiv className="pointer-events-none absolute -bottom-56 right-[-8%] h-96 w-[65%] rotate-[-8deg] rounded-[50%] bg-[#1B519F]/45" aria-hidden="true" />
      <Container className="relative py-14">
        <Ldiv className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <Lsection><Ldiv className="flex items-center gap-3"><Lspan className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full"><Image src="/images/brand/logo-mark.png" alt="" width={76} height={76} className="max-w-none shrink-0 object-contain brightness-0 invert" style={{ width: "76px", height: "auto" }} /></Lspan><Lh2 className="text-xl font-black">Smartera Hub</Lh2></Ldiv><Lp className="mt-5 max-w-xs text-sm leading-7 text-blue-100">{siteConfig.description}</Lp><Lp className="mt-4 text-sm font-extrabold text-[#F59223]">{siteConfig.tagline}</Lp><Ldiv className="mt-6 flex"><La href={socialLinks[0].href} target="_blank" rel="noopener noreferrer" aria-label="Visit Smartera Hub on Facebook" title="Facebook" className="inline-flex h-10 w-10 items-center justify-center text-white transition hover:-translate-y-0.5 hover:text-[#F59223] focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"><FacebookIcon /></La></Ldiv></Lsection>
          <Lsection><FooterTitle>Quick Links</FooterTitle><Lnav className="mt-5 space-y-3" aria-label="Footer quick links">{primaryNavigation.map((item) => <Link key={item.href} href={item.href} className="block text-sm text-blue-100 transition-all hover:translate-x-1 hover:text-[#F59223]">› {item.label}</Link>)}</Lnav></Lsection>
          <Lsection><FooterTitle>Opportunities</FooterTitle><Lnav className="mt-5 space-y-3" aria-label="Footer opportunity links">{opportunityNavigation.map((item) => <Link key={item.href} href={item.href} className="block text-sm text-blue-100 transition-all hover:translate-x-1 hover:text-[#F59223]">› {item.label}</Link>)}</Lnav></Lsection>
          <Lsection><FooterTitle>Contact Us</FooterTitle><Ldiv className="mt-5 space-y-3 text-sm leading-7 text-blue-100">{contact.length ? contact.map((value) => <Lp key={value}>{value}</Lp>) : <Lp>Use the Contact page to reach Smartera Hub. Public contact details can be configured through the site environment.</Lp>}<Link href="/contact" className="mt-4 inline-flex font-extrabold text-[#F59223]">Contact Smartera Hub </Link></Ldiv></Lsection>
        </Ldiv>
        <Ldiv className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-blue-100 sm:flex-row sm:items-center sm:justify-between"><Lp>© {new Date().getFullYear()} Smartera Hub. All rights reserved.</Lp><Ldiv className="flex gap-5"><Link href="/privacy-policy" className="hover:text-[#F59223]">Privacy Policy</Link><Link href="/terms-and-conditions" className="hover:text-[#F59223]">Terms & Conditions</Link></Ldiv></Ldiv>
      </Container>
    </Lfooter>
  );
}
