"use client";

import { Elements } from "@stripe/react-stripe-js";
import {
  MOCK_CHECKOUT_FORM_ID,
  MockCardPaymentForm,
} from "@/features/academics/components/mock-card-payment-form";
import { StripePaymentForm } from "@/features/academics/components/stripe-payment-form";
import { LockIcon } from "@/features/academics/components/icons";
import type { CheckoutPaymentStatus } from "@/features/academics/hooks/use-checkout-payment";
import { isMockPaymentMode } from "@/lib/mock-payments";
import { getStripePromise, isStripeTestMode, stripeElementsAppearance } from "@/lib/stripe";

const STRIPE_CHECKOUT_FORM_ID = "academics-stripe-checkout-form";

type StripePaymentSectionProps = {
  status: CheckoutPaymentStatus;
  clientSecret: string | null;
  error: string | null;
  payLabel: string;
  onRetry: () => void;
  onProcessingChange?: (processing: boolean) => void;
  mockMode?: boolean;
  onMockSuccess?: () => void;
};

export function getStripeCheckoutFormId(): string {
  return STRIPE_CHECKOUT_FORM_ID;
}

export function getCheckoutPaymentFormId(mockMode = isMockPaymentMode()): string {
  return mockMode ? MOCK_CHECKOUT_FORM_ID : STRIPE_CHECKOUT_FORM_ID;
}

/** Payment method block: mock UI (dev), Payment Element, or waiting-for-backend fallback. */
export function StripePaymentSection({
  status,
  clientSecret,
  error,
  payLabel,
  onRetry,
  onProcessingChange,
  mockMode = isMockPaymentMode(),
  onMockSuccess,
}: StripePaymentSectionProps) {
  const stripePromise = getStripePromise();
  const showTestBadge = mockMode || (process.env.NODE_ENV === "development" && isStripeTestMode);

  return (
    <section>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-[#2D2F31]">Payment method</h2>
        <p className="inline-flex items-center gap-1.5 text-sm text-[#6A6F73]">
          <LockIcon className="h-3.5 w-3.5" />
          Secure and encrypted
          {showTestBadge ? (
            <span className="ml-1 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800">
              {mockMode ? "Frontend Test Mode" : "Test Mode"}
            </span>
          ) : null}
        </p>
      </div>

      <div className="mt-4">
        {mockMode ? (
          <MockCardPaymentForm
            payLabel={payLabel}
            onProcessingChange={onProcessingChange}
            onSuccess={onMockSuccess}
            successRedirectHref="/academics/my-learning"
          />
        ) : null}

        {!mockMode && (status === "loading" || status === "idle") ? (
          <div
            className="space-y-3 rounded border border-[#d1d7dc] bg-white p-4"
            aria-busy="true"
            aria-live="polite"
          >
            <p className="text-sm font-semibold text-[#2D2F31]">Preparing secure payment...</p>
            <div className="h-12 animate-pulse rounded bg-slate-100" />
            <div className="h-12 animate-pulse rounded bg-slate-100" />
            <div className="h-12 w-2/3 animate-pulse rounded bg-slate-100" />
          </div>
        ) : null}

        {!mockMode && status === "ready" && clientSecret && stripePromise ? (
          <div className="space-y-4 rounded border border-[#d1d7dc] bg-white p-4 sm:p-5">
            {process.env.NODE_ENV === "development" ? (
              <details className="rounded border border-[#d1d7dc] bg-[#F7F9FA] px-3 py-2 text-xs text-[#6A6F73]">
                <summary className="cursor-pointer font-semibold text-[#2D2F31]">Test payment help</summary>
                <p className="mt-2">Successful test card: 4242 4242 4242 4242</p>
                <p>Expiry: any future date | CVC: any 3 digits | ZIP: any valid value</p>
              </details>
            ) : null}
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: stripeElementsAppearance,
              }}
            >
              <StripePaymentForm
                formId={STRIPE_CHECKOUT_FORM_ID}
                payLabel={payLabel}
                onProcessingChange={onProcessingChange}
              />
            </Elements>
          </div>
        ) : null}

        {!mockMode && status === "unavailable" ? (
          <div className="space-y-2 rounded border border-[#d1d7dc] bg-white p-4">
            <p className="text-sm font-bold text-[#2D2F31]">Payment integration is not connected yet.</p>
            {process.env.NODE_ENV === "development" ? (
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">UI Preview Mode</p>
            ) : null}
            <p className="text-sm text-[#6A6F73]">Stripe test payment is ready for backend connection.</p>
            <p className="text-sm text-[#6A6F73]">
              A PaymentIntent client secret is required to process a Stripe test payment.
            </p>
            {error ? <p className="text-sm text-[#6A6F73]">{error}</p> : null}
          </div>
        ) : null}

        {!mockMode && status === "error" ? (
          <div className="space-y-3 rounded border border-[#d1d7dc] bg-white p-4">
            <p role="alert" className="text-sm text-[#B42318]">
              {error || "We couldn't initialize the payment form."}
            </p>
            <button
              type="button"
              onClick={onRetry}
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#1B519F] px-4 text-sm font-bold text-[#1B519F] transition hover:bg-[#EEF5FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59223]"
            >
              Try Again
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

