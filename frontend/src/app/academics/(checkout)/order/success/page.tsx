import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderSuccessPageClient } from "@/features/academics/components/order-success-page";

export const metadata: Metadata = {
  title: "Order status",
  description: "Academics order and enrollment status.",
};

export default function AcademicsOrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-2xl px-4 py-16 text-center text-slate-500" aria-busy="true">
          Loading order status...
        </div>
      }
    >
      <OrderSuccessPageClient />
    </Suspense>
  );
}
