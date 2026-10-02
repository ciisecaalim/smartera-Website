import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { AcademicsHeader } from "@/features/academics/components/academics-header";
import { CartConfirmationHost } from "@/features/academics/components/cart-confirmation-host";
import { PromoBanner } from "@/features/academics/components/promo-banner";

export default function AcademicsMarketplaceLayout({ children }: { children: ReactNode }) {
  return (
    <div className="site-theme-root min-h-screen bg-white text-[#182230]">
      <PromoBanner />
      <AcademicsHeader />
      {children}
      <Footer />
      <CartConfirmationHost />
    </div>
  );
}
