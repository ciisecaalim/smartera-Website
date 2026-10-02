import type { Metadata } from "next";
import { CheckoutPageClient } from "@/features/academics/components/checkout-page";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Review billing details and complete your Academics course purchase.",
};

export default function AcademicsCheckoutPage() {
  return <CheckoutPageClient />;
}
