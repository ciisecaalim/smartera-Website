import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { opportunityNavigation, primaryNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { socialLinks } from "@/config/social-links";

function FooterTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-xs font-black uppercase tracking-[.14em] text-white">{children}<span className="mt-3 block h-0.5 w-10 rounded-full bg-[#F59223]" /></h2>;
}

export function Footer() {
  const contact = [siteConfig.contact.email, siteConfig.contact.phone, siteConfig.contact.location].filter(Boolean);
  return (
    <footer className="relative overflow-hidden bg-[#1B519F] text-white">
      <div className="pointer-events-none absolute -bottom-56 right-[-8%] h-96 w-[65%] rotate-[-8deg] rounded-[50%] bg-[#1B519F]/45" aria-hidden="true" />
      <Container className="relative py-14">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <section><div className="flex items-center gap-3"><span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full"><Image src="/images/brand/logo-mark.png" alt="" width={76} height={76} className="max-w-none shrink-0 object-contain" style={{ width: "76px", height: "auto" }} /></span><h2 className="text-xl font-black">Smartera Hub</h2></div><p className="mt-5 max-w-xs text-sm leading-7 text-blue-100">{siteConfig.description}</p><p className="mt-4 text-sm font-extrabold text-[#F59223]">{siteConfig.tagline}</p><div className="mt-6 flex flex-wrap gap-2">{socialLinks.map((item) => <a key={item.label} href={item.href} aria-label={item.label} className="rounded-full border border-white/20 px-3 py-2 text-xs font-bold text-blue-100 transition-colors hover:border-[#F59223] hover:text-[#F59223]">{item.label}</a>)}</div></section>
          <section><FooterTitle>Quick Links</FooterTitle><nav className="mt-5 space-y-3" aria-label="Footer quick links">{primaryNavigation.map((item) => <Link key={item.href} href={item.href} className="block text-sm text-blue-100 transition-all hover:translate-x-1 hover:text-[#F59223]">› {item.label}</Link>)}</nav></section>
          <section><FooterTitle>Opportunities</FooterTitle><nav className="mt-5 space-y-3" aria-label="Footer opportunity links">{opportunityNavigation.map((item) => <Link key={item.href} href={item.href} className="block text-sm text-blue-100 transition-all hover:translate-x-1 hover:text-[#F59223]">› {item.label}</Link>)}</nav></section>
          <section><FooterTitle>Contact Us</FooterTitle><div className="mt-5 space-y-3 text-sm leading-7 text-blue-100">{contact.length ? contact.map((value) => <p key={value}>{value}</p>) : <p>Use the Contact page to reach Smartera Hub. Public contact details can be configured through the site environment.</p>}<Link href="/contact" className="mt-4 inline-flex font-extrabold text-[#F59223]">Contact Smartera Hub →</Link></div></section>
        </div>
        <div className="mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 text-xs text-blue-100 sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Smartera Hub. All rights reserved.</p><div className="flex gap-5"><Link href="/privacy-policy" className="hover:text-[#F59223]">Privacy Policy</Link><Link href="/terms-and-conditions" className="hover:text-[#F59223]">Terms & Conditions</Link></div></div>
      </Container>
    </footer>
  );
}
