import type { Metadata } from "next";
import { CartPageClient } from "@/features/academics/components/cart-page";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review selected Academics courses before checkout.",
};

export default function AcademicsCartPage() {
  return (
    <div className="mx-auto w-full max-w-[1400px] px-4 py-10 sm:px-5 xl:px-6">
      <CartPageClient />
    </div>
  );
}
