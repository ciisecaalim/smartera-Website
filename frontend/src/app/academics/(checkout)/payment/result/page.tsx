import type { Metadata } from "next";
import { Suspense } from "react";
import { PaymentResultPageClient } from "@/features/academics/components/payment-result-page";

export const metadata: Metadata = {
  title: "Payment result",
  description: "Stripe payment confirmation status for Academics checkout.",
};

export default function AcademicsPaymentResultPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-16 text-center text-slate-500" aria-busy="true">
          Confirming your payment...
        </div>
      }
    >
      <PaymentResultPageClient />
    </Suspense>
  );
}
