"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { CheckIcon } from "@/features/academics/components/icons";
import { getStripePromise } from "@/lib/stripe";

type ResultState = "processing" | "succeeded" | "processing_async" | "failed" | "cancelled" | "unknown";

type ResolvedView = {
  state: ResultState;
  message: string;
};

function resolveFromQuery(clientSecret: string | null, redirectStatus: string | null): ResolvedView | null {
  if (clientSecret) return null;

  if (redirectStatus === "failed") {
    return {
      state: "failed",
      message: "Your payment could not be completed. Please check your payment details and try again.",
    };
  }

  return {
    state: "unknown",
    message: "We could not find payment confirmation details for this session.",
  };
}

/**
 * Interprets Stripe return_url query params.
 * Does not grant enrollment - webhook/backend confirmation remains authoritative.
 */
export function PaymentResultPageClient() {
  const searchParams = useSearchParams();
  const clientSecret = searchParams.get("payment_intent_client_secret");
  const redirectStatus = searchParams.get("redirect_status");

  const queryView = useMemo(
    () => resolveFromQuery(clientSecret, redirectStatus),
    [clientSecret, redirectStatus],
  );

  const [stripeView, setStripeView] = useState<ResolvedView | null>(null);

  useEffect(() => {
    if (!clientSecret) return;
    const secret = clientSecret;

    let cancelled = false;

    async function verify() {
      const stripePromise = getStripePromise();
      if (!stripePromise) {
        if (!cancelled) {
          setStripeView({
            state: "unknown",
            message: "Secure payment is temporarily unavailable.",
          });
        }
        return;
      }

      const stripe = await stripePromise;
      if (!stripe || cancelled) return;

      const { paymentIntent, error } = await stripe.retrievePaymentIntent(secret);
      if (cancelled) return;

      if (error || !paymentIntent) {
        setStripeView({
          state: "failed",
          message: "Your payment could not be completed. Please check your payment details and try again.",
        });
        return;
      }

      switch (paymentIntent.status) {
        case "succeeded":
          setStripeView({
            state: "succeeded",
            message: "Payment received. We're confirming your enrollment.",
          });
          break;
        case "processing":
          setStripeView({
            state: "processing_async",
            message: "Payment is processing. We'll confirm enrollment once payment is verified.",
          });
          break;
        case "requires_payment_method":
          setStripeView({
            state: "failed",
            message: "Your payment could not be completed. Please check your payment details and try again.",
          });
          break;
        case "canceled":
          setStripeView({
            state: "cancelled",
            message: "Payment was cancelled. No charge was completed.",
          });
          break;
        default:
          setStripeView({
            state: "unknown",
            message: "Payment status is not confirmed yet. Please check My Learning shortly or contact support.",
          });
      }
    }

    void verify();
    return () => {
      cancelled = true;
    };
  }, [clientSecret]);

  const view: ResolvedView =
    queryView ??
    stripeView ?? {
      state: "processing",
      message: "Confirming your payment...",
    };

  const title =
    view.state === "succeeded"
      ? "Payment received"
      : view.state === "processing" || view.state === "processing_async"
        ? "Processing payment"
        : view.state === "cancelled"
          ? "Payment cancelled"
          : view.state === "failed"
            ? "Payment failed"
            : "Payment status";

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center">
      {view.state === "succeeded" ? (
        <span className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
      ) : null}

      <h1 className="mt-5 text-3xl font-black text-[#0B1F3A]">{title}</h1>
      <p className="mt-3 text-slate-500" aria-live="polite">
        {view.message}
      </p>
      <p className="mt-2 text-xs text-slate-400">
        Course access is granted only after payment is verified by Smartera Hub systems.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {view.state === "failed" || view.state === "cancelled" ? (
          <Link
            href="/academics/checkout"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1B519F] px-5 text-sm font-bold text-white hover:bg-[#174783]"
          >
            Return to checkout
          </Link>
        ) : (
          <Link
            href="/academics/my-learning"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-[#1B519F] px-5 text-sm font-bold text-white hover:bg-[#174783]"
          >
            Read More...
          </Link>
        )}
        <Link
          href="/academics"
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-[#1B519F] px-5 text-sm font-bold text-[#1B519F] hover:bg-[#EEF5FF]"
        >
          Browse courses
        </Link>
      </div>
    </div>
  );
}

